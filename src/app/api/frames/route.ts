import { NextResponse } from "next/server";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const framesDir = join(process.cwd(), "public", "frames");
    const files = readdirSync(framesDir).filter((f) => f.endsWith(".png"));

    const count = files.length;
    const firstFrame = "1";
    const lastFrame = String(count);

    return NextResponse.json({ count, firstFrame, lastFrame });
  } catch (error) {
    console.error("Error fetching frames:", error);
    return NextResponse.json(
      { error: "Failed to fetch frames" },
      { status: 500 }
    );
  }
}
