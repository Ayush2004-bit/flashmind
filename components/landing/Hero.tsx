"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const handleDemoScroll = () => {
    const demoSection = document.getElementById("demo");

    if (demoSection) {
      demoSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-20 px-6">
      {/* Background Blur */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Badge */}
      <div className="mb-6 rounded-full border border-zinc-700 bg-zinc-900/40 px-4 py-2 text-sm font-medium backdrop-blur">
        ✨ AI-Powered Learning Platform
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold max-w-5xl leading-tight">
        Turn Any Content Into
        <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Smart Flashcards
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-lg text-zinc-400">
        Generate flashcards from PDFs, YouTube videos and class notes in
        seconds using AI.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link href="/dashboard">
          <Button size="lg" className="w-48">
            Get Started
          </Button>
        </Link>

        <Button
          variant="outline"
          size="lg"
          className="w-48"
          onClick={handleDemoScroll}
        >
          Watch Demo
        </Button>
      </div>
    </section>
  );
}