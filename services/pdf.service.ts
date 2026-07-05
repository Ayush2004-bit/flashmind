// @ts-expect-ignore
import pdf from "pdf-parse";

export async function extractPDFText(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);

    return data.text || "";
  } catch (error) {
    console.error("PDF Parse Error:", error);
    throw new Error("Failed to extract text from PDF");
  }
}