"use client";
import { useMemo } from "react";

import { DataTable } from "@/components/ui/data-table";
import { doctorsTable, patientsTable } from "@/db/schema";

import {
  AppointmentWithRelations,
  createAppointmentsTableColumns,
} from "./appointments-table-columns";

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
  const columns = useMemo(
    () => createAppointmentsTableColumns({ patients, doctors }),
    [patients, doctors]
  );

  return <DataTable columns={columns} data={appointments} />;
};
