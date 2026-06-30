"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type DeleteDeckButtonProps = {
  deckId: string;
};

export default function DeleteDeckButton({
  deckId,
}: DeleteDeckButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/decks/${deckId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete deck");
      }

      setOpen(false);

      router.refresh();

    } catch (err) {
      console.error(err);
      alert("Failed to delete deck.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-red-500/40 px-3 py-2 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition"
      >
        <Trash2 size={16} />
        Delete
      </button>

      <ConfirmDialog
        open={open}
        title="Delete Deck"
        description="Are you sure you want to delete this deck? This action cannot be undone."
        loading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}