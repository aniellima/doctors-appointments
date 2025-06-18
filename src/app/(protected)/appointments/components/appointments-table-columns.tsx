"use client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

import { AppointmentTableActions } from "./appointments-table-actions";

export type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

interface AppointmentTableColumnsProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export const createAppointmentsTableColumns = ({
  patients,
  doctors,
}: AppointmentTableColumnsProps): ColumnDef<AppointmentWithRelations>[] => [
  {
    id: "patientName",
    accessorKey: "patient.name",
    header: "Paciente",
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Data e Horário",
    cell(props) {
      const appointment = props.row.original;
      return dayjs(appointment.date).format("DD/MM/YYYY HH:mm");
    },
  },
  {
    id: "doctorName",
    accessorKey: "doctor.name",
    header: "Médico",
  },
  {
    id: "doctorSpecialty",
    accessorKey: "doctor.specialty",
    header: "Especialidade",
  },
  {
    id: "appointmentPrice",
    accessorKey: "appointmentPriceInCents",
    header: "Valor",
    cell(props) {
      const appointment = props.row.original;
      const valueInReais = appointment.appointmentPriceInCents / 100;
      return valueInReais.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },

  {
    id: "actions",
    cell: (props) => {
      const appointment = props.row.original;
      return (
        <AppointmentTableActions
          appointment={appointment}
          patients={patients}
          doctors={doctors}
        />
      );
    },
  },
];
