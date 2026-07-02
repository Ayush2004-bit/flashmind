"use client";

import { useState } from "react";
import { Youtube } from "lucide-react";

export default function YouTubeUploader() {
  const [url, setUrl] = useState("");

  return (
    <div className="rounded-3xl border border-zinc-700 bg-zinc-900/50 p-10">

      <div className="flex justify-center">
        <Youtube
          size={70}
          className="text-red-500"
        />
      </div>

      <h2 className="text-3xl font-bold text-center mt-6">
        Paste YouTube Link
      </h2>

      <p className="text-zinc-400 text-center mt-3">
        Generate AI flashcards directly from educational YouTube videos.
      </p>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        className="mt-8 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 outline-none focus:border-red-500"
      />

      <button
        className="mt-8 w-full rounded-xl bg-red-600 py-4 font-semibold hover:bg-red-700 transition"
      >
        Generate Flashcards
      </button>

    </div>
  );
}