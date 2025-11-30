import { NextResponse } from "next/server";

export async function GET() {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  const healthData = {
    uptime,
    memoryUsage,
  };

  return NextResponse.json(healthData);
}
