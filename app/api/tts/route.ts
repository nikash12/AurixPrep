import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

type languagesTypes = {
  [key: string]: {
    voice_id: string;
    style: string;
  };
};

const languages: languagesTypes = {
  "Tamil": { "voice_id": "ta-IN-iniya", "style": "Conversational" },
  "Hindi": { "voice_id": "hi-IN-amit", "style": "Conversational" },
  "English": { "voice_id": "en-US-ken", "style": "Conversational" },
  "Japanese": { "voice_id": "ja-JP-denki", "style": "Conversational" }
};


const client = new PrismaClient();
export async function POST(req: NextRequest) {
  const { text, sessionId }: { text: string, sessionId: string } = await req.json();
  const session = await client.session.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  const language = session.language || "English";
  try {
    const response = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      {
        text,
        "voice_id": languages[language]?.voice_id || "en-US-ken",
        "style": languages[language]?.style || "Conversational",
        "format": "mp3"
      },
      {
        headers: {
          "api-key": process.env.MURF_API_KEY!,  
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error generating speech:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Error generating speech", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
