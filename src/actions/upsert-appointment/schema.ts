import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().uuid({
    message: "ID do paciente inválido.",
  }),
  doctorId: z.string().uuid({
    message: "ID do médico inválido.",
  }),
  appointmentPriceInCents: z.number().min(1, {
    message: "Preço da consulta é obrigatório.",
  }),
  date: z.date({
    required_error: "Data é obrigatória.",
  }),
  time: z.string().min(1, {
    message: "Horário é obrigatório.",
  }),
});
