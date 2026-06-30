
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export default ai;

export async function generateFlashcards(
  topic: string,
  count: number = 10
) {
  console.log("Prompt Topic:", topic);
  console.log("Flashcard Count:", count);

  const prompt = `
You are an expert teacher.

Generate exactly ${count} high-quality flashcards about "${topic}".

Rules:

- Generate exactly ${count} flashcards.
- Every question should be unique.
- Keep questions concise.
- Keep answers short and easy to understand.
- Cover different concepts of the topic.
- Return ONLY valid JSON.

Format:

[
  {
    "question": "...",
    "answer": "..."
  }
]

Do not use markdown.

Do not write \`\`\`json.

Do not add explanations.

Do not add extra text.

Only return JSON.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
  });

  console.log("Gemini Response:", response);
  console.log("Response Text:", response.text);

  return response.text;
}

