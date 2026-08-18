import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, gender } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "EMAIL_EXISTS" }, { status: 400 });

    const user = await prisma.user.create({
      data: { name, email, password, gender },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "DB_CONNECTION_FAILED" }, { status: 503 });
  }
}
