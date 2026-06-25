export default function DashboardHeader() {
  return (
    <header className="border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          FlashMind
        </h2>

        <button className="border border-zinc-700 px-4 py-2 rounded-lg">
          Profile
        </button>
      </div>
    </header>
  );
}