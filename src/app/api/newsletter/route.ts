import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const emailSchema = z.string().trim().toLowerCase().email("Invalid email address");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = emailSchema.safeParse(body?.email);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const email = parsed.data;

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({
        message: "You're already subscribed — nothing else to do!",
      });
    }

    await db.newsletterSubscriber.create({
      data: { email },
    });

    return NextResponse.json(
      { message: "Thanks for subscribing! We'll keep you posted." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.newsletterSubscriber.count();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("Newsletter count error:", err);
    return NextResponse.json({ count: 0 });
  }
}
