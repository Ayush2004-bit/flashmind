export default function RecentSets() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        Recent Flashcard Sets
      </h2>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
        <h3 className="text-lg font-semibold">
          No flashcards generated yet
        </h3>

        <p className="text-zinc-400 mt-2">
          Start by entering a topic above and generate your first flashcard set.
        </p>
      </div>
    </section>
  );
}