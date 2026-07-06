
import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { isClerkPublishableKeyConfigured } from "@/lib/clerk";

export const metadata: Metadata = {
  title: "FlashMind",
  description: "AI-Powered Flashcard Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClerkConfigured = isClerkPublishableKeyConfigured();

  const content = (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={2500}
          />
        </ThemeProvider>
      </body>
    </html>
  );

  if (!isClerkConfigured) {
    return content;
  }

  return <ClerkProvider>{content}</ClerkProvider>;
}

