"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RenameDeckDialogProps = {
  open: boolean;
  currentTitle: string;
  loading?: boolean;
  onCancel: () => void;
  onSave: (title: string) => void;
};

export default function RenameDeckDialog({
  open,
  currentTitle,
  loading = false,
  onCancel,
  onSave,
}: RenameDeckDialogProps) {
  const [title, setTitle] = useState(currentTitle);

  useEffect(() => {
    setTitle(currentTitle);
  }, [currentTitle]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-[450px] rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white">
              Rename Deck
            </h2>

            <p className="mt-3 text-zinc-400">
              Enter a new name for your flashcard deck.
            </p>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-purple-500"
              placeholder="Deck Name"
            />

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={onCancel}
                disabled={loading}
                className="rounded-xl border border-zinc-700 px-5 py-2 hover:border-white transition"
              >
                Cancel
              </button>

              <button
                onClick={() => onSave(title)}
                disabled={loading}
                className="rounded-xl bg-purple-600 px-5 py-2 hover:bg-purple-700 transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}