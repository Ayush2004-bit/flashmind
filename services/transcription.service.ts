import fs from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";
import ytdl from "ytdl-core";
import ffmpegPath from "ffmpeg-static";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function transcribeYoutubeWithWhisper(videoId: string) {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "yt-audio-"));
  const audioFile = path.join(tempDir, `${videoId}.mp3`);

  // Download audio stream and transcode to mp3 using ffmpeg
  await new Promise<void>((resolve, reject) => {
    const audioStream = ytdl(videoId, { quality: "highestaudio" }).on("error", reject);

    const ff = spawn(ffmpegPath || "ffmpeg", [
      "-i",
      "pipe:0",
      "-vn",
      "-acodec",
      "libmp3lame",
      "-ar",
      "16000",
      "-ac",
      "1",
      "-f",
      "mp3",
      audioFile,
    ]);

    ff.on("error", (err) => reject(err));
    ff.stderr?.on("data", () => {});

    ff.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });

    audioStream.pipe(ff.stdin!);
  });

  // Upload the audio file to OpenAI Whisper API (audio transcription)
  const formData = new (await import("form-data"))();
  formData.append("file", fs.createReadStream(audioFile));
  formData.append("model", "whisper-1");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData as any,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI transcription failed: ${res.status} ${txt}`);
  }

  const json = await res.json();
  const transcription = json.text as string;

  // cleanup
  try {
    fs.unlinkSync(audioFile);
    fs.rmdirSync(tempDir);
  } catch {}

  return transcription;
}

export default transcribeYoutubeWithWhisper;
