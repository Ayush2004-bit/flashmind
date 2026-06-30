"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RenameDeckDialog from "./RenameDeckDialog";
import { toast } from "sonner";

type RenameDeckButtonProps = {
  deckId: string;
  currentTitle: string;
};

export default function RenameDeckButton({
  deckId,
  currentTitle,
}: RenameDeckButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRename = async (title: string) => {
    console.log("========== RENAME START ==========");
    console.log("Deck ID:", deckId);
    console.log("Old Title:", currentTitle);
    console.log("New Title:", title);

    if (!title.trim()) {
      console.log("Title is empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/decks/${deckId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      console.log("HTTP Status:", res.status);

      const result = await res.json();

      console.log("API Response:", result);

      if (!res.ok) {
        throw new Error(result.error || "Rename failed");
      }

      console.log("Rename Successful");
      toast.success("Deck renamed successfully!");
      setOpen(false);

      window.location.reload();

    } catch (err) {
      console.error("Rename Error:", err);
      toast.error("Failed to rename deck.");
    } finally {
      setLoading(false);
      console.log("========== RENAME END ==========");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-purple-500/40 px-3 py-2 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500 transition"
      >
        <Pencil size={16} />
        Rename
      </button>

      <RenameDeckDialog
        open={open}
        currentTitle={currentTitle}
        loading={loading}
        onCancel={() => setOpen(false)}
        onSave={handleRename}
      />
    </>
  );
}