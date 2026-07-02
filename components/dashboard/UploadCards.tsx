
import Link from "next/link";
import { FileText, PlayCircle, NotebookPen } from "lucide-react";

export default function UploadCards() {
  const cards = [
    {
      title: "Upload PDF",
      description:
        "Convert lecture notes, ebooks and study material into AI flashcards.",
      icon: FileText,
      href: "/dashboard/pdf",
    },
    {
      title: "YouTube Video",
      description:
        "Generate flashcards directly from educational YouTube videos.",
      icon: PlayCircle,
      href: "/dashboard/youtube",
    },
    {
  title: "Paste Notes",
  description:
    "Paste your class notes and instantly create revision flashcards.",
  icon: NotebookPen,
  href: "/dashboard/notes",
},
  ];

  return (
    <div className="mt-14">
      <div className="border-t border-zinc-800 pt-10">
        <h2 className="text-2xl font-bold">
          Or choose a source
        </h2>

        <p className="text-zinc-400 mt-2 mb-8">
          Generate flashcards from PDFs, YouTube videos, or your notes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="block h-full"
            >
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-purple-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <Icon className="h-12 w-12 text-purple-500 mb-4" />

                <h3 className="text-xl font-semibold mb-3">
                  {card.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

