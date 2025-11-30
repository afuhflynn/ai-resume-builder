import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getVersion, deleteVersion } from "@/lib/versioning";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { versionId } = await params;

    const version = await getVersion(versionId);

    if (!version) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    // Verify the resume belongs to the user
    if (version.resume.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(version);
  } catch (error) {
    console.error("Error fetching version:", error);
    return NextResponse.json(
      { error: "Failed to fetch version" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { versionId } = await params;

    const result = await deleteVersion(versionId, session.user.id);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error deleting version:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete version" },
      { status: 500 }
    );
  }
}
