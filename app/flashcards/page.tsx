import React, { Suspense } from "react";
import FlashcardsClient from "@/components/flashcards/FlashcardsClient";

export default function FlashcardsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white">
          <div className="text-lg text-zinc-300">Loading flashcards...</div>
        </div>
      }
    >
      <FlashcardsClient />
    </Suspense>
  );
}