"use client";

import { DataTable } from "@/components/ui/data-table";
import { doctorsTable, patientsTable } from "@/db/schema";

import {
  AppointmentWithRelations,
  createAppointmentsTableColumns,
} from "./table-columns";

interface AppointmentsDataTableProps {
  appointments: AppointmentWithRelations[];
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export const AppointmentsDataTable = ({
  appointments,
  patients,
  doctors,
}: AppointmentsDataTableProps) => {
  const columns = createAppointmentsTableColumns({ patients, doctors });

  return <DataTable columns={columns} data={appointments} />;
};
