"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function TopicGenerator() {
    const router = useRouter();
    const [topic, setTopic] = useState("");
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 mt-8">
      
      <h2 className="text-2xl font-bold mb-2">
        What do you want to learn today?
      </h2>

      <p className="text-zinc-400 mb-6">
        Enter any topic and generate AI flashcards instantly.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        
        <input
  type="text"
  placeholder="Enter a topic..."
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  className="flex-1 rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-purple-500"
/>

        <button
        onClick={() => router.push(`/flashcards?topic=${topic}`)}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-medium transition"
        >
          Generate Flashcards
        </button>

      </div>

    </div>
  );
}