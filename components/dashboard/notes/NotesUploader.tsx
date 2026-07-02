"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, NotebookPen } from "lucide-react";
import { toast } from "sonner";

export default function NotesUploader() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleGenerate = async () => {
    if (!notes.trim()) {
      toast.error("Please paste your notes first.");
      return;
    }

    try {
      setLoading(true);

      const toastId = toast.loading(
        "Generating flashcards..."
      );

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: notes,
          count: 10,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.error || "Generation failed",
          { id: toastId }
        );
        return;
      }

      // Save flashcards
      sessionStorage.setItem(
        "flashcards",
        JSON.stringify(data.flashcards)
      );

      // Save title
      sessionStorage.setItem(
        "deckTitle",
        data.deckTitle
      );

      // Save source
      sessionStorage.setItem(
        "source",
        "notes"
      );

      toast.success(
        "Flashcards generated successfully!",
        {
          id: toastId,
        }
      );

      router.push("/flashcards");
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <div className="flex items-center gap-3 mb-6">
        <NotebookPen
          size={30}
          className="text-emerald-500"
        />

        <h2 className="text-2xl font-bold">
          Paste Your Notes
        </h2>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your class notes here..."
        rows={15}
        className="w-full rounded-2xl border border-zinc-700 bg-black/40 p-5 outline-none resize-none text-white placeholder:text-zinc-500 focus:border-emerald-500 transition"
      />

      <div className="flex justify-between mt-4 text-sm text-zinc-500">
        <span>{notes.length} characters</span>

        <span>
          AI will generate 10 flashcards
        </span>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-8 rounded-xl bg-emerald-600 px-8 py-3 font-semibold hover:bg-emerald-700 transition disabled:opacity-60 flex items-center gap-3"
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Generating...
          </>
        ) : (
          "Generate Flashcards"
        )}
      </button>
    </div>
  );
}