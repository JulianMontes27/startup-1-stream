import getSession from "@/lib/get-session";
import UserButton from "../auth/user-button";
import { redirect } from "next/navigation";

const MainNavbar = async () => {
  const session = await getSession(); //cached on the server current request
  const user = session?.user;
  if (!user) {
    return redirect("/api/auth/signin");
  }
  return (
    <div>
      <UserButton user={user} />
    </div>
  );
};

export default MainNavbar;
