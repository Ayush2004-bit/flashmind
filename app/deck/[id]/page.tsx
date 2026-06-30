"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FlashCard from "@/components/flashcards/flashcard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Flashcard = {
  question: string;
  answer: string;
};

type Deck = {
  id: string;
  title: string;
  topic: string;
  flashcards: Flashcard[];
};

export default function DeckPage() {
  const { id } = useParams();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [reviewedCards, setReviewedCards] = useState<number[]>([]);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await fetch(`/api/decks/${id}`);

        if (!res.ok) {
          throw new Error("Deck not found");
        }

        const data = await res.json();

        setDeck(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Deck...
      </main>
    );
  }

  if (!deck) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Deck not found.
      </main>
    );
  }

  const progress =
    deck.flashcards.length === 0
      ? 0
      : Math.round(
          (reviewedCards.length / deck.flashcards.length) * 100
        );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 mb-8 rounded-xl border border-zinc-700 px-4 py-2 hover:border-purple-500"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1 className="text-5xl font-bold">
          {deck.title}
        </h1>

        <p className="text-zinc-400 mt-4">
          {deck.topic}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10 mb-12">

          <div className="rounded-3xl border border-zinc-800 bg-white/5 p-8">
            <p className="uppercase text-zinc-400 text-sm">
              Topic
            </p>

            <h2 className="text-3xl font-bold mt-3 capitalize text-purple-400">
              {deck.topic}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-white/5 p-8">
            <p className="uppercase text-zinc-400 text-sm">
              Total Cards
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {deck.flashcards.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-white/5 p-8">

            <p className="uppercase text-zinc-400 text-sm">
              Progress
            </p>

            <div className="mt-5 h-3 bg-zinc-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-purple-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <h2 className="text-2xl font-bold mt-5">
              {reviewedCards.length} / {deck.flashcards.length}
            </h2>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {deck.flashcards.map((card, index) => (

            <FlashCard
              key={index}
              question={card.question}
              answer={card.answer}
              flipped={flippedCard === index}
              reviewed={reviewedCards.includes(index)}
              onFlip={() => {

                setFlippedCard(
                  flippedCard === index ? null : index
                );

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