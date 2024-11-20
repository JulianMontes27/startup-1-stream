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
  if (!user) {
    return NextResponse.json({
      message:
        "[OFFER_SERVICE_POST]: User is not authenticated. Sign in to request to the API.",
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const { title, price, category, location, description, status } = body;

    //try to send the data to the DB
    Object.keys(body).map((key) => {
      //create an error response for each body item

      if (!body[key]) {
        console.log(`Missing critical body request item: ${key}`);
        return new NextResponse("Title is required", { status: 400 });
      }
    });

    //query to the db with prisma ORM
    const response = await prisma.service.create({
      data: {
        title,
        price,
        category,
        location,
        description,
        status,
        offererId: user.id
      }
    })
    return();
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error. Try again later.", {
      status: 500,
    });
  }
}
