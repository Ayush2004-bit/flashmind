export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const params = await searchParams;
  const topic = params.topic || "No Topic Selected";

  const flashcards = [
    {
      question: "What is an Operating System?",
      answer: "Software that manages computer resources.",
    },
    {
      question: "What is a Kernel?",
      answer: "The core component of an operating system.",
    },
    {
      question: "What is a Process?",
      answer: "A program that is currently executing.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">
        Generated Flashcards
      </h1>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-zinc-400 mb-2">
          Topic
        </p>

        <h2 className="text-2xl font-semibold text-purple-400">
          {topic}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <h3 className="text-lg font-semibold mb-3 text-purple-400">
              Q: {card.question}
            </h3>

            <p className="text-zinc-300">
              A: {card.answer}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}