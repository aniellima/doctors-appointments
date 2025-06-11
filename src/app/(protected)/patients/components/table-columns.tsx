"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PatternFormat } from "react-number-format";

import { patientsTable } from "@/db/schema";

import { PatientTableActions } from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

export const patientTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell(props) {
      const patient = props.row.original;
      return (
        <PatternFormat
          value={patient.phoneNumber}
          format="(##) #####-####"
          mask="_"
        />
      );
    },
  },
  {
    id: "gender",
    accessorKey: "gender",
    header: "Gênero",
    cell(props) {
      const patient = props.row.original;
      if (patient.gender === "male") return "Masculino";
      if (patient.gender === "female") return "Feminino";
      return "Outros";
    },
  },
  {
    id: "actions",
    cell: (props) => {
      const patient = props.row.original;
      return <PatientTableActions patient={patient} />;
    },
  },
];
