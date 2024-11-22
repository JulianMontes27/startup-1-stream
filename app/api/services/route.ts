import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { message: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        category,
        status: "available", // Only fetch available services
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        location: true, // Fetch longitude and latitude
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching services" },
      { status: 500 }
    );
  }
}
