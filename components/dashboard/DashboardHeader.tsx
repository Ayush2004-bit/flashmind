"use client";

import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader() {
  return (
    <header className="border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          FlashMind
        </h2>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
            },
          }}
        />
      </div>
    </header>
  );
}