"use client";

import FlashCard from "@/components/flashcards/flashcard";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

type Flashcard = {
  question: string;
  answer: string;
};

export default function FlashcardsPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [reviewedCards, setReviewedCards] = useState<number[]>([]);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deckTitle, setDeckTitle] = useState("");

  useEffect(() => {
  const data = sessionStorage.getItem("flashcards");
  if (!data) return;

  try {
    // Pehle check karo valid JSON hai ya nahi
    let parsed = data;
    
    // Agar string hai toh parse karo
    if (typeof data === "string") {
      parsed = JSON.parse(data);
    }

    // Array hai toh seedha set karo
    if (Array.isArray(parsed)) {
      setFlashcards(parsed);
    } else {
      console.error("Not an array:", parsed);
      setFlashcards([]);
    }

    const savedTitle = sessionStorage.getItem("deckTitle");
    if (savedTitle) {
      setDeckTitle(savedTitle);
    } else if (topic) {
      setDeckTitle(topic);
    }
  } catch (err) {
    console.error("Parse error:", err);
    setFlashcards([]);
  }
}, [topic]);

  const handleSaveDeck = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: deckTitle || "Untitled Deck",
          topic: deckTitle || "General",
          flashcards,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to save deck");
      }
      alert("🎉 Deck saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save deck");
    } finally {
      setSaving(false);
    }
  };

  const progress =
    flashcards.length === 0
      ? 0
      : Math.round((reviewedCards.length / flashcards.length) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-purple-500 hover:bg-zinc-800 hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>

            <button
              onClick={handleSaveDeck}
              disabled={saving || flashcards.length === 0}
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 px-6 py-3 font-semibold shadow-lg shadow-purple-900/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-700/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save
                size={18}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              {saving ? "Saving..." : "Save Deck"}
            </button>
          </div>

          <h1 className="text-5xl font-bold">AI Flashcards</h1>
          <p className="text-zinc-400 mt-4 text-lg">
            Learn anything faster with interactive AI generated flashcards.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Topic */}
          <div className="rounded-3xl border border-zinc-800 bg-white/5 backdrop-blur-xl p-8">
            <p className="uppercase tracking-widest text-zinc-400 text-sm">
              Topic
            </p>
            <h2 className="text-3xl font-bold mt-3 capitalize text-purple-400">
              {deckTitle}
            </h2>
          </div>

          {/* Total Cards */}
          <div className="rounded-3xl border border-zinc-800 bg-white/5 backdrop-blur-xl p-8">
            <p className="uppercase tracking-widest text-zinc-400 text-sm">
              Total Cards
            </p>
            <h2 className="text-3xl font-bold mt-3">
              {flashcards.length}
            </h2>
          </div>

          {/* Progress */}
          <div className="rounded-3xl border border-zinc-800 bg-white/5 backdrop-blur-xl p-8">
            <p className="uppercase tracking-widest text-zinc-400 text-sm">
              Study Progress
            </p>
            <div className="mt-5 h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <h2 className="text-2xl font-bold mt-5">
              {reviewedCards.length} / {flashcards.length}
            </h2>
            <p className="text-zinc-400 mt-2">{progress}% Complete</p>
          </div>
        </div>

        {/* Flashcards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {flashcards.map((card, index) => (
            <FlashCard
              key={index}
              question={card.question}
              answer={card.answer}
              flipped={flippedCard === index}
              reviewed={reviewedCards.includes(index)}
              onFlip={() => {
                setFlippedCard(flippedCard === index ? null : index);
                if (!reviewedCards.includes(index)) {
                  setReviewedCards((prev) => [...prev, index]);
                }
              }}
            />
          ))}
        </div>

      </div>
    </main>
  );
}