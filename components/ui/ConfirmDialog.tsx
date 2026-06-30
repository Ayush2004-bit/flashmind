"use client";

import { motion, AnimatePresence } from "framer-motion";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        >

          <motion.div
            initial={{ scale: .9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: .9, opacity: 0 }}
            className="w-[420px] rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
          >

            <h2 className="text-2xl font-bold">
              {title}
            </h2>

            <p className="text-zinc-400 mt-4">
              {description}
            </p>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={onCancel}
                disabled={loading}
                className="rounded-xl border border-zinc-700 px-5 py-2 hover:border-white transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="rounded-xl bg-red-600 px-5 py-2 hover:bg-red-700 transition"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}