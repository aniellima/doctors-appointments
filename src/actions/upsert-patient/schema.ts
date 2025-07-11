import { z } from "zod/v4";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório.",
  }),
  email: z.string().trim().min(1).email({
    message: "Email inválido.",
  }),
  phoneNumber: z.string().trim().min(11, {
    message: "Número de telefone é obrigatório.",
  }),
  gender: z.enum(["male", "female", "other"], {
    message: "Gênero é obrigatório.",
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
