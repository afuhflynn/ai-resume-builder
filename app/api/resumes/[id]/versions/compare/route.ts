import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { compareVersions } from "@/lib/versioning";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { versionId1, versionId2 } = body;

    if (!versionId1 || !versionId2) {
      return NextResponse.json(
        { error: "Both version IDs are required" },
        { status: 400 }
      );
    }

    const comparison = await compareVersions(versionId1, versionId2);

    return NextResponse.json(comparison);
  } catch (error: any) {
    console.error("Error comparing versions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to compare versions" },
      { status: 500 }
    );
  }
}
