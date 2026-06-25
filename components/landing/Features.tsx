import {
  Sparkles,
  FileText,
  Brain,
} from "lucide-react";

export default function Features() {
  const features = [
  {
    title: "AI Flashcard Generation",
    description:
      "Generate high quality flashcards instantly using advanced AI models.",
    icon: Sparkles,
  },
  {
    title: "PDF & YouTube Support",
    description:
      "Create flashcards directly from PDFs, notes and YouTube videos.",
    icon: FileText,
  },
  {
    title: "Smart Revision",
    description:
      "Review cards using spaced repetition for better retention.",
    icon: Brain,
  },
];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
  <h2 className="text-4xl md:text-5xl font-bold">
    Powerful Features
  </h2>

  <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
    Everything you need to transform learning content into
    AI-powered flashcards.
  </p>
</div>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-purple-500/50 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
  <feature.icon className="h-6 w-6 text-purple-400" />
</div>
              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}