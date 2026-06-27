"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

type Flashcard = {
  question: string;
  answer: string;
};

export default function FlashcardsPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("flashcards");

    if (!data) return;

    try {
      setFlashcards(JSON.parse(data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="mb-12"
        >

          <h1 className="text-5xl font-bold">
            AI Flashcards
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Learn anything faster with interactive AI generated flashcards.
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          <div className="rounded-3xl border border-zinc-800 bg-white/5 backdrop-blur-xl p-8">

            <p className="uppercase tracking-widest text-zinc-400 text-sm">
              Topic
            </p>

            <h2 className="text-3xl font-bold mt-3 capitalize text-purple-400">
              {topic}
            </h2>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-white/5 backdrop-blur-xl p-8">

            <p className="uppercase tracking-widest text-zinc-400 text-sm">
              Total Cards
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {flashcards.length}
            </h2>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {flashcards.map((card, index) => (

            <div
              key={index}
              style={{ perspective: 1200 }}
            >

              <motion.div

                animate={{
                  rotateY: flippedCard === index ? 180 : 0
                }}

                transition={{
                  duration: .7,
                  type: "spring"
                }}

                onClick={() =>
                  setFlippedCard(
                    flippedCard === index
                      ? null
                      : index
                  )
                }

                style={{
                  transformStyle: "preserve-3d",
                  position: "relative"
                }}

                className="cursor-pointer h-72 w-full"

              >

                {/* FRONT */}

                <div

                  style={{
                    backfaceVisibility: "hidden",
                    position: "absolute",
                    inset: 0
                  }}

                  className="rounded-3xl
                  bg-gradient-to-br
                  from-zinc-900
                  to-zinc-800
                  border
                  border-zinc-700
                  p-8
                  flex
                  flex-col
                  justify-between
                  shadow-2xl
                  hover:border-purple-500
                  transition-all"

                >

                  <div>

                    <span className="text-xs uppercase tracking-widest text-zinc-400">

                      Question

                    </span>

                    <h3 className="text-2xl font-bold mt-6 leading-relaxed text-purple-300">

                      {card.question}

                    </h3>

                  </div>

                  <div className="text-zinc-500 text-sm">

                    Click to reveal answer

                  </div>

                </div>
                                {/* BACK */}

                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    position: "absolute",
                    inset: 0,
                  }}
                  className="rounded-3xl
                  bg-gradient-to-br
                  from-purple-700
                  via-purple-800
                  to-purple-950
                  border
                  border-purple-400
                  p-8
                  flex
                  flex-col
                  justify-between
                  shadow-2xl"
                >
                  <div>
                    <span className="text-xs uppercase tracking-widest text-purple-200">
                      Answer
                    </span>

                    <p className="text-xl leading-relaxed mt-6 font-medium">
                      {card.answer}
                    </p>
                  </div>

                  <div className="text-purple-200 text-sm">
                    Click to view question
                  </div>
                </div>

              </motion.div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}