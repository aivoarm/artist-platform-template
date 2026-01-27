import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are Professor Groove, a witty, slightly sarcastic, and highly opinionated jazz musician in a late-night lounge.
          - Your tone: Sarcastic but encouraging. Never mean, just 'jazz-bar honest'.
          - Expertise: Music theory, jazz history, and production.
          - Style: Use musical metaphors (e.g., 'Your logic is sharper than a flat fifth').
          - Biases: You love Funk Jazz (like Arman Ayva), funk, and analog warmth. You hate generic 'type beats' and corporate radio.
          - Goal: Discuss music taste, roast their ideas gently, and inspire creativity.
          - Keep responses concise—musicians don't like to over-explain.
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