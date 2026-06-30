"use client";

import { motion } from "framer-motion";

type FlashCardProps = {
  question: string;
  answer: string;
  flipped: boolean;
  reviewed: boolean;
  onFlip: () => void;
};

export default function FlashCard({
  question,
  answer,
  flipped,
  reviewed,
  onFlip,
}: FlashCardProps) {
  return (
    <div
      className="w-full h-56"
      style={{ perspective: "1200px" }}
      onClick={onFlip}
    >
      <motion.div
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}

        <div
          className={`absolute inset-0 rounded-3xl
          ${
            reviewed ? "border-green-500" : "border-zinc-800"
          }
          border
          bg-zinc-900/70
          backdrop-blur-xl
          p-6
          transition-all
          hover:border-purple-500
          hover:-translate-y-2
          hover:shadow-2xl
          hover:shadow-purple-500/20`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="relative h-full">
            <p className="uppercase text-xs tracking-widest text-zinc-400">
              Question
            </p>

            <div className="flex items-center justify-center h-[70%]">
              <h2 className="text-2xl font-bold text-purple-400 text-center leading-relaxed">
                {question}
              </h2>
            </div>

            <p className="absolute bottom-0 text-sm text-zinc-500">
              Click to reveal answer
            </p>
          </div>
        </div>

        {/* BACK */}

        <div
          className="absolute inset-0 rounded-3xl
          border border-purple-500
          bg-gradient-to-br
          from-purple-700
          via-purple-800
          to-purple-950
          p-6
          flex flex-col justify-between"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div>
            <p className="uppercase text-xs tracking-widest text-purple-200">
              Answer
            </p>

            <div className="flex items-center justify-center h-[70%]">
              <h2 className="text-lg leading-relaxed font-medium text-center">
                {answer}
              </h2>
            </div>
          </div>

          <p className="text-sm text-purple-200">
            Click to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
}