import { Button } from "@/components/ui/button";

export default function Hero() {
return ( <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-19 px-6"> <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" /> <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />


  <div className="mb-6 rounded-full border px-4 py-2 text-sm font-medium">
    ✨ AI-Powered Learning Platform
  </div>

  <h1 className="text-5xl md:text-7xl font-bold max-w-5xl leading-tight">
    Turn Any Content Into
    <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
      Smart Flashcards
    </span>
  </h1>

  <p className="mt-6 max-w-2xl text-lg text-gray-500">
    Generate flashcards from PDFs, YouTube videos and notes in seconds
    using AI.
  </p>

  <div className="mt-8 flex gap-4">
    <Button size="lg">Get Started</Button>

    <Button variant="outline" size="lg">
      Watch Demo
    </Button>
  </div>
</section>


);
}
