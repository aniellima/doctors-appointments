"use client";

import { CalendarIcon, ClockIcon, DollarSign } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import formatCurrencyInCents from "@/helpers/currency";

import getAvailability from "../helpers/availability";
import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const availability = getAvailability(doctor);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium truncate">{doctor.name}</h3>
            <p className="text-xs text-muted-foreground break-words">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2 py-3 flex-1">
        <Badge variant="outline" className="justify-start text-xs">
          <CalendarIcon className="mr-1 h-3 w-3 flex-shrink-0" />
          <span className="truncate">
            {availability.from.format("dddd")} as {availability.to.format("dddd")}
          </span>
        </Badge>
        <Badge variant="outline" className="justify-start text-xs">
          <ClockIcon className="mr-1 h-3 w-3 flex-shrink-0" />
          <span className="truncate">
            {availability.from.format("HH:mm")} - {availability.to.format("HH:mm")}
          </span>
        </Badge>
        <Badge variant="outline" className="justify-start text-xs">
          <DollarSign className="mr-1 h-3 w-3 flex-shrink-0" />
          <span className="truncate">
            {formatCurrencyInCents(doctor.appointmentPriceInCents)}
          </span>
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="pt-3">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full text-sm">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm
            doctor={{
              ...doctor,
              availableFromTime: availability.from.format("HH:mm:ss"),
              availableToTime: availability.to.format("HH:mm:ss"),
            }}
            onSuccess={() => setIsOpen(false)}
            isOpen={isOpen}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
