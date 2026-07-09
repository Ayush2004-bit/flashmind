import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UploadCards from "@/components/dashboard/UploadCards";
import TopicGenerator from "@/components/dashboard/TopicGenerator";
import RecentSets from "@/components/dashboard/RecentSets";
import { isClerkServerConfigured } from "@/lib/clerk";
import { BrainCircuit } from "lucide-react";

export default async function DashboardPage() {
  if (!isClerkServerConfigured()) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md rounded-xl border border-zinc-800 bg-zinc-950/80 p-8 text-center">
          <h1 className="text-2xl font-semibold">Authentication is currently unavailable</h1>
          <p className="mt-2 text-sm text-zinc-400">
            The deployment environment is missing the required Clerk credentials.
          </p>
        </div>
      </main>
    );
  }

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <DashboardHeader />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold flex items-center gap-3">
  <BrainCircuit className="h-9 w-9 text-purple-500" />
  Welcome Back
</h1>

        <p className="text-zinc-400 mt-2">
          Choose how you want to generate flashcards.
        </p>
<TopicGenerator />
        <UploadCards />
        <RecentSets />
      </div>
    </main>
  );
}