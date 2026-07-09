
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import DeleteDeckButton from "./DeleteDeckButton";
import RenameDeckButton from "./RenameDeckButton";
import SearchDeck from "./SearchDeck";

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

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await fetch("/api/decks");

        if (!res.ok) {
          let body: any = null;

          try {
            body = await res.json();
          } catch (_) {
            /* ignore json parse errors */
          }

          // If the user is not authenticated, redirect to sign-in.
          if (res.status === 401) {
            const signInUrl =
              (process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string) ||
              "/sign-in";

            if (typeof window !== "undefined") {
              window.location.href = signInUrl;
            }

            return;
          }

          console.error("Failed to fetch decks", res.status, body);
          setDecks([]);
          return;
        }

        const data = await res.json();

        setDecks(data);
      } catch (err) {
        console.error(err);
        setDecks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const filteredDecks = decks.filter((deck) => {
    const keyword = search.toLowerCase();

    return (
      deck.title.toLowerCase().includes(keyword) ||
      deck.topic.toLowerCase().includes(keyword)
    );
  });

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

      {/* SEARCH BAR */}

      <SearchDeck
        value={search}
        onChange={setSearch}
      />

      {loading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <p className="text-zinc-400">
            Loading decks...
          </p>
        </div>
      ) : filteredDecks.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h3 className="text-lg font-semibold">
            No Matching Decks
          </h3>

          <p className="text-zinc-400 mt-2">
            Try another keyword.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDecks.map((deck) => (
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

                <div className="flex items-center gap-2">
                  <RenameDeckButton
                    deckId={deck.id}
                    currentTitle={deck.title}
                  />

                  <DeleteDeckButton
                    deckId={deck.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
