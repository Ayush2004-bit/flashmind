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
    let videoTitle = "";

    // If YouTube URL is provided
    if (youtubeUrl) {
      console.log("YouTube URL received:", youtubeUrl);

      const videoId = extractVideoId(youtubeUrl);

      if (!videoId) {
        return NextResponse.json(
          { error: "Invalid YouTube URL" },
          { status: 400 }
        );
      }

      // Fetch transcript
      const transcript = await getTranscript(videoId);

      // Fetch actual video title
      videoTitle = await getVideoTitle(videoId);

      finalTopic = `
Generate flashcards from the following YouTube transcript.

Transcript:

${transcript}
`;
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

    // Generate flashcards
    const flashcards = await generateFlashcards(finalTopic, count);

    return NextResponse.json({
      success: true,
      flashcards,
      videoTitle,
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