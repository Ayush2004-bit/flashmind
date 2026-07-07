"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function YouTubeUploader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleGenerate = async () => {
    if (!url.trim()) {
      toast.error("Please paste a YouTube URL!");
      return;
    }

    // Validate YouTube URL
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/|live\/|v\/)|youtu\.be\/).+/;

    if (!youtubeRegex.test(url)) {
      toast.error("Invalid YouTube URL!");
      return;
    }

    try {
      setIsLoading(true);

      const toastId = toast.loading(
        "Generating flashcards..."
      );

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeUrl: url,
          count: 10,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.error || "Failed to generate flashcards",
          { id: toastId }
        );
        return;
      }

      // Save flashcards
      sessionStorage.setItem(
        "flashcards",
        JSON.stringify(data.flashcards)
      );

      // Save title
      sessionStorage.setItem(
        "deckTitle",
        data.deckTitle
      );

      // Save source
      sessionStorage.setItem(
        "source",
        "youtube"
      );

      toast.success(
        "Flashcards generated successfully!",
        {
          id: toastId,
        }
      );

      router.push("/flashcards");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-700 p-8">
      <h2 className="text-2xl font-bold mb-4">
        YouTube Flashcards
      </h2>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL..."
        className="w-full rounded-lg border border-zinc-600 bg-zinc-900 p-3 text-white outline-none focus:border-red-500 transition"
        disabled={isLoading}
      />

      <p className="text-zinc-500 text-sm mt-2">
        Example: https://youtube.com/watch?v=xxxxx
      </p>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="mt-4 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 font-medium transition flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Generating...
          </>
        ) : (
          "Generate Flashcards"
        )}
      </button>
    </div>
  );
}