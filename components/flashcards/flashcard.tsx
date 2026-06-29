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
      className="w-full h-52"
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
border
${reviewed ? "border-green-500" : "border-zinc-800"}
bg-zinc-900/70
backdrop-blur-xl
p-8
flex flex-col justify-between
hover:border-purple-500
transition-all`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div>
            <p className="uppercase text-xs tracking-widest text-zinc-400">
              Question
            </p>

            <h2 className="mt-6 text-2xl font-bold text-purple-400 leading-relaxed">
              {question}
            </h2>
          </div>

          <p className="text-sm text-zinc-500">
            Click to reveal answer
          </p>
        </div>

        {/* BACK */}

        <div
          className="absolute inset-0 rounded-3xl
          border border-purple-500
          bg-gradient-to-br
          from-purple-700
          via-purple-800
          to-purple-950
          p-8
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

            <h2 className="mt-6 text-xl leading-relaxed font-medium">
              {answer}
            </h2>
          </div>

          <p className="text-sm text-purple-200">
            Click to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
}