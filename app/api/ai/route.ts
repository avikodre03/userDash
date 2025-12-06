import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });

    const chat = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",     // ✅ Updated supported FREE model
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      success: true,
      reply: chat.choices[0].message.content,
    });

  } catch (err: any) {
    console.error("AI Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "AI error" },
      { status: 500 }
    );
  }
}
