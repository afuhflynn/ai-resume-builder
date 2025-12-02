import { NextRequest } from "next/server";
import { ajAI } from "@/lib/arcjet";
import { streamResumeImprovement } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const decision = await ajAI.protect(req, { requested: 1 });

  if (decision.isDenied()) {
    return new Response("Too many requests", { status: 429 });
  }

  const { section } = await req.json();

  const result = streamResumeImprovement(section);

  return result.toTextStreamResponse();
}
