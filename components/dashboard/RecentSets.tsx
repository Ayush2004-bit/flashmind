"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import DeleteDeckButton from "./DeleteDeckButton";

type Deck = {
  id: string;
  title: string;
  topic: string;
  flashcards: {
    question: string;
    answer: string;
  }[];
  created_at: string;
};

export default function RecentSets() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await fetch("/api/decks");

        if (!res.ok) {
          throw new Error("Failed to fetch decks");
        }

        const data = await res.json();

        setDecks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Recent Flashcard Sets
        </h2>

        {decks.length > 0 && (
          <span className="text-sm text-zinc-400">
            {decks.length} Saved Decks
          </span>
        )}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <p className="text-zinc-400">
            Loading decks...
          </p>
        </div>
      ) : decks.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h3 className="text-lg font-semibold">
            No Saved Decks
          </h3>

          <p className="text-zinc-400 mt-2">
            Generate and save your first flashcard deck.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-purple-500 transition-all"
            >
              <Link href={`/deck/${deck.id}`}>
                <div className="flex items-center justify-between">
                  <BookOpen className="text-purple-500" />

                  <ChevronRight
                    size={18}
                    className="text-zinc-500"
                  />
                </div>

                <h3 className="text-xl font-bold mt-5 capitalize">
                  {deck.title}
                </h3>

                <p className="text-zinc-400 mt-2 capitalize">
                  {deck.topic}
                </p>

                <div className="flex items-center gap-2 mt-4 text-sm text-zinc-500">
                  <CalendarDays size={15} />
                  {new Date(
                    deck.created_at
                  ).toLocaleDateString()}
                </div>
              </Link>

              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-zinc-400">
                  {deck.flashcards.length} Cards
                </span>

                <DeleteDeckButton deckId={deck.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}