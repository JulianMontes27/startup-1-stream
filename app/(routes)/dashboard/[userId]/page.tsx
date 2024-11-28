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
  const services = await prisma.service.findMany({
    where: {
      offererId: user.id,
    },
  });

  return (
    <div className="sm:p-2">
      <section>
        {/* show if the user is currently offering services */}

        <ul>
          {services?.length === 0 ? (
            <AddServiceBtn />
          ) : (
            <div>
              <h1>Your active service:</h1>
              {services?.map((service) => (
                <Link
                  key={service.id}
                  href={`/dashboard/${user.id}/offered-services/${service.id}`}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          )}
        </ul>
      </section>
    </div>
  );
};

export default UserHomePage;
