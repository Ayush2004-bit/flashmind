import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";
import YouTubeUploader from "@/components/dashboard/youtube/YouTubeUploader";

export default function YouTubePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-red-500 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mt-10 mb-10">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-red-500/10 p-3">
              <PlayCircle
                size={34}
                className="text-red-500"
              />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                AI YouTube Studio
              </h1>

              <p className="text-zinc-400 mt-2 text-lg">
                Paste a YouTube video link and instantly generate AI flashcards.
              </p>
            </div>
          </div>
        </div>

        {/* YouTube Upload Component */}
        <YouTubeUploader />

      </div>
    </main>
  );
}