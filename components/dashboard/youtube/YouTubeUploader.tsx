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

    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+/;
    if (!youtubeRegex.test(url)) {
      toast.error("Invalid YouTube URL!");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Extracting transcript...");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: url, count: 10 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Flashcards generated!", { id: toastId });

      // Flashcards page pe bhejo
      sessionStorage.setItem("flashcards", JSON.stringify(data.flashcards));
      sessionStorage.setItem(
  "deckTitle",
  data.videoTitle
);
      router.push("/flashcards");

    } catch (error: any) {
      toast.error(error.message || "Failed to generate!", { id: toastId });
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
            <Loader2 size={18} className="animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Flashcards"
        )}
      </button>
    </div>
  );
}