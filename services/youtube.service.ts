import { YoutubeTranscript } from "youtube-transcript";

/* ===========================
   Extract Video ID
=========================== */

export function extractVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // https://www.youtube.com/watch?v=xxxx
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }

    // https://youtu.be/xxxx
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    return null;
  } catch {
    return null;
  }
}

/* ===========================
   Get Transcript
=========================== */

export async function getTranscript(videoId: string) {
  const transcript = await YoutubeTranscript.fetchTranscript(videoId);

  return transcript
    .map((item) => item.text)
    .join(" ");
}

export async function getVideoTitle(videoId: string) {
  const response = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video title");
  }

  const data = await response.json();

  return data.title as string;
}