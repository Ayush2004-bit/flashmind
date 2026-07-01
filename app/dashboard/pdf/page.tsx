
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PDFUploader from "@/components/pdf/PDFUploader";

export default function PDFPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-purple-500 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mt-10 mb-10">
          <h1 className="text-5xl font-bold">
            AI PDF Studio
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Upload your study material and let AI generate smart flashcards.
          </p>
        </div>

        {/* PDF Upload Component */}
        <PDFUploader />

      </div>
    </main>
  );
}

