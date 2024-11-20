import getSession from "@/lib/get-session";

import LandingHome from "@/components/landing-page/landing";
import { redirect } from "next/navigation";

export default async function CreateRestaurantModalPage() {
  //check for auth (cached)
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return <LandingHome />;
  }

  //if the user IS authed, redirect to their dashboard page
  // return redirect(`dashboard/${user.id}`);
  return redirect(`/dashboard/${user.id}`);
}
