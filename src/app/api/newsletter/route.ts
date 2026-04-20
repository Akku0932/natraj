import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const trimmed = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmed)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const existing = await db.newsletter.findUnique({
      where: { email: trimmed },
    });

    if (existing) {
      return NextResponse.json(
        { message: "This email is already subscribed" },
        { status: 409 }
      );
    }

    await db.newsletter.create({
      data: { email: trimmed },
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
