import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API Key missing" }, { status: 500 });

    const { prompt, mode } = await req.json();

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    let systemInstruction = "";
    let responseMimeType = "text/plain";

    if (mode === "trivia") {
      responseMimeType = "application/json";
      systemInstruction = `
        You are a trivia engine. Generate 1 difficult question.
        Return ONLY raw JSON. Do not include markdown.
        Schema: { "q": "string", "a": ["string", "string", "string", "string"], "correct": number, "fact": "string" }
      `;
    } else {
      systemInstruction = "You are an art director. Create a high-fidelity image prompt.";
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${systemInstruction}\n\nUser Request: ${prompt}` }] }],
        generationConfig: {
          temperature: mode === "trivia" ? 0.1 : 0.7,
          maxOutputTokens: 2048,
          responseMimeType: responseMimeType,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "API Error" }, { status: response.status });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    return NextResponse.json({ text });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}