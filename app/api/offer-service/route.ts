import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  //check for auth
  if (req.method !== "POST") {
    return NextResponse.json({
      message: "[OFFER_SERVICE_POST]: internal error",
      status: 404,
    });
  }
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return NextResponse.json({
      message:
        "[OFFER_SERVICE_POST]: User is not authenticated. Sign in to request to the API.",
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const { title, price, category, latitude, longitude, description } = body;

    // Validate request body
    const missingKeys = Object.keys(body).filter((key) => !body[key]);
    if (missingKeys.length > 0) {
      return NextResponse.json(
        {
          message: `Missing critical body request items: ${missingKeys.join(
            ", "
          )}`,
          status: 400,
        },
        { status: 400 }
      );
    }

    //send query to create a new service in the DB
    const response = await prisma.service.create({
      data: {
        title,
        price,
        category,
        description,
        status: "available", //since the user JUST created the service, its avaible UNTIL another user pays them. As soon as the service is DONE, revert back to available status
        offererId: user?.id,
        location: {
          create: {
            latitude,
            longitude,
          },
        },
      },
    });

    //succesful prisma query
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error. Try again later.", {
      status: 500,
    });
  }
}
