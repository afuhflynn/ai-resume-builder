import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCreditStats } from "@/lib/credits";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stats = await getCreditStats(session.user.id);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Credits stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
