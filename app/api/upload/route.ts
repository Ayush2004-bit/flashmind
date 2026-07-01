import { NextResponse } from "next/server";
import { extractPDFText } from "@/services/pdf.service";
import { generateFlashcardsFromText } from "@/services/ai.service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text
    const extractedText = await extractPDFText(buffer);

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: "No text found in PDF." },
        { status: 400 }
      );
    }

    // Generate flashcards
    const flashcards =
      await generateFlashcardsFromText(extractedText);

    return NextResponse.json({
      success: true,
      flashcards,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "PDF Flashcard Generation Failed",
      },
      {
        status: 500,
      }
    );
  }
}