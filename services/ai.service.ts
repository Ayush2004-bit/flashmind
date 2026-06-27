import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export default ai;

export async function generateFlashcards(topic: string) {
  console.log("Prompt Topic:", topic);
  const prompt = `
You are an expert teacher.

Generate exactly 10 flashcards about "${topic}".

Return ONLY valid JSON.

Format:

[
  {
    "question": "...",
    "answer": "..."
  }
]

Do not use markdown.
Do not add explanation.
Do not write anything except JSON.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
  });

console.log("Gemini Response:", response);
console.log("Response Text:", response.text);

  return response.text;
}