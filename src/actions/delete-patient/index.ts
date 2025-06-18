"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod/v4";

import db from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export const DeletePatient = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    })
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }
    const patient = await db.query.patientsTable.findFirst({
      where: eq(patientsTable.id, parsedInput.id),
    });

    if (!patient) {
      throw new Error("Paciente não encontrado");
    }
    if (patient.clinicId !== session.user.clinic?.id)
      throw new Error(
        "Usuário não pertence à clínica ao qual este paciente está vinculado."
      );
    await db.delete(patientsTable).where(eq(patientsTable.id, parsedInput.id));
    revalidatePath("/patients");
  });
