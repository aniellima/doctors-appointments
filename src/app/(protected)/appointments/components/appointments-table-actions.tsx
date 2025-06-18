"use client";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { DeleteAppointment } from "@/actions/delete-appointment";
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
// import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

import { UpsertAppointmentForm } from "./upsert-appointment-form";

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

interface AppointmentTableActionsProps {
  appointment: AppointmentWithRelations;
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export const AppointmentTableActions = ({
  appointment,
  patients,
  doctors,
}: AppointmentTableActionsProps) => {
  const [upsertDialogIsOpen, setupsertDialogIsOpen] = useState(false);
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

  const deleteAppointmentAction = useAction(DeleteAppointment, {
    onSuccess: () => {
      toast.success("Agendamento excluído com sucesso!");
      setDeleteDialogIsOpen(false);
    },
    onError: () => {
      toast.error("Erro ao deletar agendamento.");
    },
  });

  const handleDeleteAppointmentClick = () => {
    deleteAppointmentAction.execute({ id: appointment.id });
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
            <DropdownMenuLabel>{appointment.patient.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setupsertDialogIsOpen(true)}>
              <EditIcon />
              Editar
            </DropdownMenuItem>
            <AlertDialog
              open={deleteDialogIsOpen}
              onOpenChange={setDeleteDialogIsOpen}
            >
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <TrashIcon />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza de que deseja deletar agendamento?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação irá deletar o agendamento permanentemente. Esta
                    ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAppointmentClick}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertAppointmentForm
          isOpen={upsertDialogIsOpen}
          appointment={appointment}
          patients={patients}
          doctors={doctors}
          onSuccess={() => setupsertDialogIsOpen(false)}
        />
      </Dialog>
    </>
  );
};
