import { NextResponse } from "next/server";
import { generateFlashcards } from "@/services/ai.service";
import {
  extractVideoId,
  getTranscript,
  getVideoTitle,
} from "@/services/youtube.service";

export async function POST(req: Request) {
  try {
    const { topic, count = 10, youtubeUrl } = await req.json();

    let finalTopic = topic;
    let deckTitle = "Untitled";

    // ===========================
    // YouTube Flashcards
    // ===========================
    if (youtubeUrl) {
      console.log("YouTube URL:", youtubeUrl);

      const videoId = extractVideoId(youtubeUrl);

      if (!videoId) {
        return NextResponse.json(
          { error: "Invalid YouTube URL" },
          { status: 400 }
        );
      }

      const transcript = await getTranscript(videoId);
      deckTitle = await getVideoTitle(videoId);

      finalTopic = `
Generate flashcards from the following YouTube transcript.

${transcript}
`;
    }

    // ===========================
    // Notes / Topic Generator
    // ===========================
    if (!youtubeUrl && topic) {
      deckTitle =
        topic
          .split("\n")
          .find((line: string) => line.trim().length > 0)
          ?.trim()
          .substring(0, 50) || "Class Notes";
    }

    if (!finalTopic) {
      return NextResponse.json(
        {
          error: "Topic or YouTube URL is required",
        },
        {
          status: 400,
        }
      );
    }

    const flashcards = await generateFlashcards(
      finalTopic,
      count
    );

    return NextResponse.json({
      success: true,
      flashcards,
      deckTitle,
    });

  } catch (error) {
    console.error("Generate API Error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}