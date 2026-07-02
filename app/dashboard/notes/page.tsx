import Link from "next/link";
import { ArrowLeft, NotebookPen } from "lucide-react";
import NotesUploader from "@/components/dashboard/notes/NotesUploader";

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-emerald-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-emerald-500 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mt-10 mb-10">
          <div className="flex items-center gap-3">
            <NotebookPen
              size={42}
              className="text-emerald-500"
            />

            <h1 className="text-5xl font-bold">
              AI Notes Studio
            </h1>
          </div>

          <p className="text-zinc-400 mt-4 text-lg">
            Paste your class notes and instantly generate AI revision flashcards.
          </p>
        </div>

        <NotesUploader />

      </div>
    </main>
  );
}