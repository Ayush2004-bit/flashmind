import type { NextConfig } from "next";

// Prevent accidental production deploys without Clerk configuration.
if (process.env.NODE_ENV === "production") {
  const missing = [] as string[];

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    missing.push("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  }

  if (!process.env.CLERK_SECRET_KEY) {
    missing.push("CLERK_SECRET_KEY");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required Clerk environment variables for production: ${missing.join(", ")}.\nSet them in your deployment platform (Vercel/Netlify/Render) and redeploy.`
    );
  }
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
