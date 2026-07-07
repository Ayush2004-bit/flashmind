import { GoogleGenAI } from "@google/genai";

const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey) {
  throw new Error("Missing GOOGLE_API_KEY environment variable");
}

const ai = new GoogleGenAI({
  apiKey: googleApiKey,
});

export default ai;

/* ===========================
   Clean Gemini JSON
=========================== */

function cleanJSON(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

/* ===========================
   Generate Flashcards
=========================== */

function parseGeminiFlashcards(text: string) {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini JSON Parse Error:", error);
    return [];
  }
}



export async function generateFlashcards(
  topic: string,
  count: number = 10
) {
  const prompt = `
You are an expert teacher.

Generate exactly ${count} flashcards about:

${topic}

Return ONLY valid JSON.

Format:

[
  {
    "question":"...",
    "answer":"..."
  }
]

No markdown.
No explanation.
Only JSON.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
  });

  const text = cleanJSON(response.text || "");

  console.log(text);

  return JSON.parse(text);
}

/* ===========================
   PDF Flashcards
=========================== */




export async function generateFlashcardsFromText(
  text: string,
  count: number = 10
) {
  const prompt = `
You are an expert teacher.

Read the following study material and generate exactly ${count} flashcards.

Study Material:

${text.slice(0, 12000)}

Return ONLY valid JSON.

Format:

[
  {
    "question":"...",
    "answer":"..."
  }
]

No markdown.
No explanation.
Only JSON.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
  });

  const cleaned = cleanJSON(response.text || "");

  return JSON.parse(cleaned);
}