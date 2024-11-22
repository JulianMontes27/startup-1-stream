import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { title, price, category, description, loc } = body;

    // Validate request body
    const missingKeys = [
      "title",
      "price",
      "category",
      "description",
      "loc",
    ].filter((key) => !body[key]);
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
        price,
        category,
        description,
        status: "available", // Initial status is 'available'
        offererId: user.id,
        location: {
          create: {
            longitude: loc.longitude,
            latitude: loc.latitude,
          },
        },
      },
    });

    // Successful Prisma query
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error. Try again later." },
      { status: 500 }
    );
  }
}
