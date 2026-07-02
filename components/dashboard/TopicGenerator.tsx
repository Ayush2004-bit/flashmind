"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TopicGenerator() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.warning("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, count }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate flashcards");
      }

      // FIXED — JSON.stringify karo
      sessionStorage.setItem("flashcards", JSON.stringify(data.flashcards));
      sessionStorage.setItem("deckTitle", topic);

      router.push(`/flashcards?topic=${encodeURIComponent(topic)}`);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 mt-8">
      <h2 className="text-2xl font-bold mb-2">
        What do you want to learn today?
      </h2>

      <p className="text-zinc-400 mb-6">
        Enter any topic and generate AI flashcards instantly.
      </p>

      {/* Flashcard Count */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-3">
          Number of Flashcards
        </h3>

        <div className="flex gap-3 flex-wrap">
          {[5, 10, 20, 30].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setCount(num)}
              className={`px-5 py-2 rounded-xl border transition-all font-medium
                ${
                  count === num
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-900 border-zinc-700 hover:border-purple-500"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          className="flex-1 rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-purple-500"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-medium transition"
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
      </div>
    </div>
  );
}