export default function HowItWorks() {
const steps = [
{
number: "01",
title: "Upload Content",
description: "Upload PDFs, notes, or paste YouTube video links.",
},
{
number: "02",
title: "AI Generates Flashcards",
description: "Our AI analyzes the content and creates smart flashcards.",
},
{
number: "03",
title: "Study & Revise",
description: "Learn faster using generated flashcards and revision tools.",
},
];

return ( <section id="how-it-works" className="py-24 px-6"> <div className="max-w-6xl mx-auto"> <div className="text-center mb-16"> <h2 className="text-4xl md:text-5xl font-bold">
How It Works </h2>


      <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
        Generate flashcards from your learning material in three simple
        steps.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step) => (
        <div
          key={step.number}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
        >
          <div className="text-4xl font-bold text-blue-500 mb-4">
            {step.number}
          </div>

          <h3 className="text-xl font-semibold mb-3">
            {step.title}
          </h3>

          <p className="text-zinc-400">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


);
}
