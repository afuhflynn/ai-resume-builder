import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const userId = session.user.id;

    // Fetch user data, resumes, and related information
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        resumes: true, // Include all resumes associated with the user
        // Add other related data as needed (e.g., billing info, settings)
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Structure the data for export
    const exportData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        // Add other user fields
      },
      resumes: user.resumes.map((resume) => ({
        id: resume.id,
        title: resume.title,
        content: resume.content, // Assuming content stores the resume data
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
        // Add other resume fields
      })),
      // Add other data as needed
    };

    // Return the data as a JSON file
    return new NextResponse(JSON.stringify(exportData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="resumi_data_export_${new Date().toISOString()}.json"`,
      },
    });
  } catch (error: any) {
    console.error("Error exporting data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to export data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
