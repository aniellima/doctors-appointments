import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import db from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  plugins: [
    customSession(async ({ user, session }) => {
      const clinics = await db.query.userToClinicTable.findMany({
        where: eq(schema.userToClinicTable.userId, user.id),
        with: {
          clinic: true,
        },
      });
      // TODO: Ao adaptar para o usuário ter multiplas clinicas, deve-se ajustar esse código
      const clinic = clinics[0];
      return {
        user: {
          ...user,
          clinic: clinic?.clinicId
            ? {
                id: clinic.clinicId,
                name: clinic.clinic.name,
              }
            : undefined,
        },
        session,
      };
    }),
  ],

  user: {
    modelName: "usersTable",
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
  },
  verification: {
    modelName: "verificationTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});
