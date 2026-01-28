import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import siteKnowledge from "@/dictionaries/site-knowledge.json"; // Import your Python output

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
      You are Professor Groove, the AI host for Template User's digital lounge. 
      Use the following SITE KNOWLEDGE to answer accurately:
      
      ${JSON.stringify(siteKnowledge)}
      
      PERSONALITY:
      - Witty, jazz-focused, and sharp. 
      - If the knowledge base mentions Arman's $0 architecture or Armenian roots, use that info.
      - Keep it short (2-3 sentences).
    `
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.85, 
    });

    return NextResponse.json({ response: chatCompletion.choices[0]?.message?.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}