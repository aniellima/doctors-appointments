import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import db from "@/db";
import { userToClinicTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  //Preciso pegar as clinicas do usuário
  const clinics = await db.query.userToClinicTable.findMany({
    where: eq(userToClinicTable.userId, session.user.id),
  });
  if (clinics.length === 0) {
    redirect("/clinic-form");
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
