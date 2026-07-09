import { NextResponse } from "next/server";
import { generateFlashcards } from "@/services/ai.service";
import {
  extractVideoId,
  getTranscript,
  getVideoTitle,
} from "@/services/youtube.service";
import { transcribeYoutubeWithWhisper } from "@/services/transcription.service";

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

      // First try to get the transcript via YouTube captions
      try {
        const transcript = await getTranscript(videoId);
        deckTitle = await getVideoTitle(videoId);

        finalTopic = `
Generate flashcards from the following YouTube transcript.

${transcript}
`;
      } catch (error) {
        console.warn("YouTube caption transcript failed:", error?.message || error);

        // If we have an OpenAI key configured, attempt an audio transcription fallback
        if (process.env.OPENAI_API_KEY) {
          try {
            const transcript = await transcribeYoutubeWithWhisper(videoId);
            deckTitle = await getVideoTitle(videoId);

            finalTopic = `
Generate flashcards from the following YouTube transcript (auto-transcribed).

${transcript}
`;
          } catch (sttError) {
            console.error("Audio transcription fallback failed:", sttError);

            const message = (sttError as any)?.message || "Audio transcription failed";

            return NextResponse.json(
              {
                error:
                  "Unable to transcribe video audio. Please try a different video or configure an OPENAI_API_KEY for server-side transcription.",
                details: process.env.NODE_ENV !== "production" ? message : undefined,
              },
              { status: 502 }
            );
          }
        } else {
          const message = (error as any)?.message || "Unable to fetch the YouTube transcript";

          return NextResponse.json(
            {
              error:
                message.startsWith("No transcript")
                  ? "No subtitles/transcript found for this video. To extract from any video enable server-side transcription by setting OPENAI_API_KEY."
                  : "Unable to fetch the YouTube transcript. Please verify the URL and make sure subtitles are available.",
              details: process.env.NODE_ENV !== "production" ? message : undefined,
            },
            { status: 502 }
          );
        }
      }
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