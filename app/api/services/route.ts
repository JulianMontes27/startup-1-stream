import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  //get all services that are available
  try {
    const services = await prisma.service.findMany({
      where: {
        status: "available", // Only fetch available services
      },
      include: {
        location: true,
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
