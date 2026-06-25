import { Button } from "@/components/ui/button";

export default function CTA() {
return ( <section className="py-16 px-6"> <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">

    <h2 className="text-4xl md:text-5xl font-bold">
      Ready to Learn Smarter?
    </h2>

    <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
      Turn your PDFs, notes and videos into AI-powered flashcards in seconds.
    </p>

    <Button
  size="lg"
  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
>
  Get Started Free
</Button>

  </div>
</section>


);
}
