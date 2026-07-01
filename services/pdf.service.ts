import pdf from "pdf-parse/lib/pdf-parse.js";

export async function extractPDFText(buffer: Buffer) {
  const data = await pdf(buffer);

  return data.text;
}