import { YoutubeTranscript } from "youtube-transcript";

/* ===========================
   Extract Video ID
=========================== */

export function extractVideoId(url: string): string | null {
  try {
    // Try URL parsing first
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    const pathname = parsed.pathname;

    if (hostname.includes("youtube.com") || hostname === "m.youtube.com") {
      // watch?v=VIDEOID
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }

      // /shorts/VIDEOID or /embed/VIDEOID or /v/VIDEOID
      const parts = pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        const possible = parts[1] || parts[0];
        if (possible && possible.length >= 5) return possible;
      }
    }

    if (hostname === "youtu.be") {
      return pathname.replace("/", "");
    }

    // Fallback: regex match for 11-char YouTube id
    const match = url.match(/[a-zA-Z0-9_-]{11}/);
    return match ? match[0] : null;
  } catch {
    return null;
  }
}

/* ===========================
   Get Transcript
=========================== */

export async function getTranscript(videoId: string) {
  try {
    // Primary attempt
    let transcript: any[] | null = null;

    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId);
    } catch (err) {
      console.warn("youtube.service: primary fetchTranscript failed", err);
    }

    // Fallback: try forcing English (some videos only expose auto-captions under a language)
    if ((!transcript || transcript.length === 0) && (YoutubeTranscript as any).fetchTranscript) {
      try {
        transcript = await (YoutubeTranscript as any).fetchTranscript(videoId, { lang: "en" });
      } catch (err) {
        console.warn("youtube.service: fallback fetchTranscript(lang=en) failed", err);
      }
    }

    if (!transcript || transcript.length === 0) {
      throw new Error("No transcript available for this video");
    }

    return transcript.map((item) => item.text).join(" ");
  } catch (err: any) {
    console.error("getTranscript error for", videoId, err?.message || err);
    throw err;
  }
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