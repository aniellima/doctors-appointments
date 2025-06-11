"use client";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { DeletePatient } from "@/actions/delete-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientTableActionsProps {
  patient: typeof patientsTable.$inferSelect;
}

export const PatientTableActions = ({ patient }: PatientTableActionsProps) => {
  const [upsertDialogIsOpen, setupsertDialogIsOpen] = useState(false);

  const deletePatientAction = useAction(DeletePatient, {
    onSuccess: () => {
      toast.success("Paciente excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao deletar paciente.");
    },
  });

  const handleDeletePatientClick = () => {
    deletePatientAction.execute({ id: patient.id });
  };

  return (
    <>
      <Dialog open={upsertDialogIsOpen} onOpenChange={setupsertDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setupsertDialogIsOpen(true)}>
              <EditIcon />
              Editar
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <TrashIcon />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza de que deseja deletar paciente?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação irá deletar o paciente permanentemente. Esta ação
                    não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeletePatientClick}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertPatientForm
          isOpen={upsertDialogIsOpen}
          patient={patient}
          onSuccess={() => setupsertDialogIsOpen(false)}
        />
      </Dialog>
    </>
  );
};
