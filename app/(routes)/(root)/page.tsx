import { auth } from "@/lib/auth";

import LandingHome from "@/components/landing-page/landing";

export default async function CreateRestaurantModalPage() {
  const session = await auth(); //fetch session on the server
  //get the User object (currently signed in User) from the Session object in the DB
  const user = session?.user;
  if (!user) {
    return <LandingHome />;
  }
  //check if the User has a Restaurant created, if he has at least one, redirect to the /dashboard page of the first Restaurant found, if not, open the modal to create a Restaurant
  // const restaurant = await prisma.restaurant.findFirst({
  //   where: {
  //     ownerId: user.id,
  //   },
  // });
  // if (restaurant) {
  //   return redirect(`/dashboard`);
  // }
  return <>User is authed</>;
}
