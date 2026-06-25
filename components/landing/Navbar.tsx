import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b">
      <h1 className="text-2xl font-bold">FlashMind</h1>

      <div className="hidden md:flex gap-6">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        
      </div>

      <Button>Sign In</Button>
    </nav>
  );
}