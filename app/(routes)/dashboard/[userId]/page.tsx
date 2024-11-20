import React from "react";

import { auth } from "@/lib/auth";

import prisma from "@/lib/prisma";
import AddServiceBtn from "@/components/main/dashboard/add-service-btn";
import Link from "next/link";

const UserHomePage = async () => {
  //check auth
  const session = await auth();
  const user = session?.user;
  if (!user) return null;

  //retrieve the signed in User's services (single object with nested arrays)
  const userWithServices = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      offeredServices: true, // Get services offered by the user
      soughtServices: true, // Get services sought by the user
    },
  });
  console.log(userWithServices);

  return (
    <div className="sm:p-2">
      <section>
        {/* show if the user is currently offering services */}
        <ul>
          {userWithServices?.offeredServices.length === 0 ? (
            <AddServiceBtn />
          ) : (
            userWithServices?.offeredServices.map((serv) => (
              <Link href={`$dashboard/${user.id}/offered-service/${serv.id}`}>
                {serv.title}
              </Link>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default UserHomePage;
