import { FileText, Sparkles, Brain } from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      title: "Upload PDF / Notes",
      icon: FileText,
    },
    {
      title: "AI Processing",
      icon: Sparkles,
    },
    {
      title: "Flashcards Ready",
      icon: Brain,
    },
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-center gap-4">
                  <div className="text-purple-400">
                    <Icon size={28} />
                  </div>
                  <span className="text-zinc-300 font-medium">
                    {step.title}
                  </span>
                  {index !== steps.length - 1 && (
                    <span className="hidden md:block text-zinc-600 text-xl ml-4">
                      →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}