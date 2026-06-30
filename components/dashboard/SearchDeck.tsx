"use client";

import { Search, X } from "lucide-react";

type SearchDeckProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchDeck({
  value,
  onChange,
}: SearchDeckProps) {
  return (
    <div className="relative mb-8">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your decks..."
        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/70 py-4 pl-12 pr-12 outline-none transition focus:border-purple-500"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
        >
          <X size={18} />
        </button>
      )}

    </div>
  );
}