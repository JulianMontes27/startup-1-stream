import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { minLat, maxLon, minLon, maxLat, category } = body;

    const services = await prisma.service.findMany({
      where: {
        category,
        status: "available",
        AND: [
          {
            location: {
              longitude: {
                gte: minLon - 0.5,
                lte: maxLon + 0.5,
              },
            },
          },
          {
            location: {
              latitude: {
                gte: minLat - 0.5,
                lte: maxLat + 0.5,
              },
            },
          },
        ],
      },
      include: {
        location: true, // Include the location data in the response
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching nearby services:", error);
    return new NextResponse("Error bounding box.", { status: 401 });
  }
}
