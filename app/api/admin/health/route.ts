import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!isAdmin(session?.session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const healthStatus: { [key: string]: string | boolean } = {};

    // Check Database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      healthStatus.database = "Healthy";
    } catch (dbError: any) {
      console.error("Health check - Database error:", dbError);
      healthStatus.database = `Unhealthy: ${
        dbError.message || "Connection failed"
      }`;
    }

    // Add checks for other services (e.g., MinIO, OpenAI, Stripe) if applicable
    // Example for a hypothetical external API check:
    // try {
    //   const openaiResponse = await fetch("https://api.openai.com/v1/models", {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //   });
    //   healthStatus.openai = openaiResponse.ok ? "Healthy" : `Unhealthy: ${openaiResponse.statusText}`;
    // } catch (openaiError: any) {
    //   console.error("Health check - OpenAI error:", openaiError);
    //   healthStatus.openai = `Unhealthy: ${openaiError.message || "Connection failed"}`;
    // }

    const overallHealthy = Object.values(healthStatus).every(
      (status) => status === "Healthy"
    );

    return NextResponse.json(
      {
        status: overallHealthy ? "Healthy" : "Degraded",
        checks: healthStatus,
        timestamp: new Date().toISOString(),
      },
      { status: overallHealthy ? 200 : 503 }
    );
  } catch (error) {
    console.error("Admin health check GET error:", error);
    return NextResponse.json(
      { error: "Failed to perform health check" },
      { status: 500 }
    );
  }
}
