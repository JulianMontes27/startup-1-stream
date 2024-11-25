import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // Extract search params
  const searchParams = req.nextUrl.searchParams;
  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");

  // Validate longitude and latitude
  if (!longitude || isNaN(parseFloat(longitude))) {
    return NextResponse.json(
      { message: "Invalid or missing 'longitude' parameter." },
      { status: 400 }
    );
  }
  if (!latitude || isNaN(parseFloat(latitude))) {
    return NextResponse.json(
      { message: "Invalid or missing 'latitude' parameter." },
      { status: 400 }
    );
  }

  // Authenticate the user
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return NextResponse.json(
      {
        message:
          "[OFFER_SERVICE_POST]: User is not authenticated. Sign in to request to the API.",
      },
      { status: 401 }
    );
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid or missing request body." },
        { status: 400 }
      );
    }

    const { title, description, category, price } = body;

    // Validate body fields
    const missingKeys = ["title", "price", "category", "description"].filter(
      (key) => !body[key]
    );
    if (missingKeys.length > 0) {
      return NextResponse.json(
        {
          message: `Missing critical body request items: ${missingKeys.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Create a new service in the database
    const response = await prisma.service.create({
      data: {
        title,
        price: parseFloat(price), // Ensure price is a Float
        category,
        description,
        status: "available", // Initial status is 'available'
        offererId: user.id,
        location: {
          create: {
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
          },
        },
      },
    });

    // Successful Prisma query
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error. Try again later." },
      { status: 500 }
    );
  }
}
