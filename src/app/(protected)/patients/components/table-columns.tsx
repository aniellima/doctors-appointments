"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { PatternFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EditIcon />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TrashIcon />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
