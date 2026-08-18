import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { foodname, meal, category, quantity, name, phoneno, address, lat, lng, email } = body;

    const donation = await prisma.foodDonation.create({
      data: {
        name,
        email,
        food: foodname,
        type: meal,
        category,
        quantity,
        address: `${address} (Lat: ${lat}, Lng: ${lng})`,
        location: "madurai",
        phoneno
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "DB_CONNECTION_FAILED" }, { status: 503 });
  }
}

export async function GET() {
  try {
    const donations = await prisma.foodDonation.findMany({
      orderBy: { Fid: 'desc' }
    });
    return NextResponse.json(donations);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "DB_CONNECTION_FAILED" }, { status: 503 });
  }
}
