import { NextResponse } from "next/server";
import { generateFlashcards } from "@/services/ai.service";

export async function POST(req: Request) {
  try {
    // Request body se topic nikaalna
    const { topic, count } = await req.json();

console.log("Received Topic:", topic);
console.log("Flashcard Count:", count);
    
    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    // Gemini se flashcards generate karna
    const flashcards = await generateFlashcards(topic, count);
console.log("Flashcards from service:", flashcards);


    // Success response
    return NextResponse.json({
      success: true,
      flashcards,
    });

  } catch (error) {
    console.error("Generate API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}