import { extractText } from "unpdf";
import mammoth from "mammoth";

export async function extractTextFromFile(
  buffer: Buffer,
  mimeType: string,
): Promise<string> {
  try {
    if (mimeType === "application/pdf") {
      // Convert Buffer to Uint8Array for unpdf
      const uint8Array = new Uint8Array(buffer);
      const result = await extractText(uint8Array);
      // Join all pages into a single string
      return result.text.join("\n\n");
    } else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else if (mimeType === "text/plain") {
      return buffer.toString("utf-8");
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    throw new Error("Failed to extract text from file");
  }
}
