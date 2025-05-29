import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <div>
      <div>DashboardPage</div>
      <div>
        <pre>{session?.user?.name}</pre>
        <pre>{session?.user?.email}</pre>
      </div>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
