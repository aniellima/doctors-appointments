import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
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
      <h1>DashboardPage</h1>
      <h2>{session?.user?.name}</h2>
      <h2>{session?.user?.email}</h2>
      <Image
        src={session?.user?.image as string}
        alt={session?.user?.name}
        width={100}
        height={100}
      />
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
