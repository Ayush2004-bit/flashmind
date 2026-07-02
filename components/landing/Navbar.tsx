import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b bg-black/80 backdrop-blur-md">
      <h1 className="text-2xl font-bold">FlashMind</h1>

      <div className="hidden md:flex gap-6">
        <a
          href="#features"
          className="hover:text-purple-400 transition"
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="hover:text-purple-400 transition"
        >
          How It Works
        </a>
      </div>

      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    </nav>
  );
}