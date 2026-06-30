
"use client";

import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function DashboardHeader() {
  return (
    <header className="border-b border-zinc-800 bg-black/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h2 className="text-2xl font-bold tracking-tight">
          FlashMind
        </h2>

        <div className="flex items-center gap-4">

          <ThemeToggle />

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />

        </div>

      </div>
    </header>
  );
}

