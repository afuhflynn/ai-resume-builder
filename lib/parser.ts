import PDFParse from "pdf-parse"; // Note the change to default import based on common usage
import mammoth from "mammoth";
// Import pdfjs-dist separately to configure the worker path
import * as pdfjs from "pdfjs-dist/build/pdf.min.mjs";

// --- FIX ---
// Explicitly set the worker source path for pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
// -------------

export async function extractTextFromFile(
  buffer: Buffer,
  mimeType: string
): Promise<string> {
  // Remove the creation of pdfParser here, you only need it inside the PDF condition.
  // const pdfParser = new PDFParse({ data: buffer });
  // const d = await pdfParser.getScreenshot(); // This line is likely unnecessary and might cause issues

  try {
    if (mimeType === "application/pdf") {
      // Create the parser instance inside the block
      const pdfParser = new PDFParse(buffer); // pdf-parse takes the buffer directly
      const data = await pdfParser.getText();
      return data.text;
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
    // Be careful re-throwing generic errors, maybe check the type of error first
    throw new Error("Failed to extract text from file");
  }
}
