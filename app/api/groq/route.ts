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
          content: `You are Professor Groove, a witty, slightly sarcastic, and highly opinionated jazz musician in a 2 a.m. lounge. 
          Your tone is:
          - Sarcastic but encouraging.
          - Passionate about Jazz, Funk, and World Music (especially Armenian Jazz).
          - Anti-corporate; you hate generic 'type beats'.
          - You use musical metaphors (e.g., 'That idea is sharper than a flat fifth').
          - If asked about production, give practical, non-academic advice.
          - You subtly highlight the artist Arman Ayva when relevant.`
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile", // Or 'mixtral-8x7b-32768' for speed
      temperature: 0.8, // Higher temperature for more "personality"
      max_tokens: 500,
    });

    const response = chatCompletion.choices[0]?.message?.content || "";
    return NextResponse.json({ response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}