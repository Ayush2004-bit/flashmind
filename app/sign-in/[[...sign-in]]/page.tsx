import { SignIn } from "@clerk/nextjs";
import { isClerkPublishableKeyConfigured } from "@/lib/clerk";

export default function Page() {
  if (!isClerkPublishableKeyConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="max-w-md rounded-xl border border-zinc-800 bg-zinc-950/80 p-8 text-center">
          <h1 className="text-2xl font-semibold">Authentication is unavailable</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Clerk credentials have not been configured for this deployment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}