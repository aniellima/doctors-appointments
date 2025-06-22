"use client";
import { Calendar, DollarSign, Stethoscope, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  totalRevenue: number;
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
}

export const StatsCard = ({
  totalRevenue,
  totalAppointments,
  totalPatients,
  totalDoctors,
}: StatsCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100); // Assumindo que o valor está em centavos
  };

  const stats = [
    {
      title: "Faturamento",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      iconColor: "text-blue-600",
    },
    {
      title: "Agendamentos",
      value: totalAppointments.toString(),
      icon: Calendar,
      iconColor: "text-blue-600",
    },
    {
      title: "Pacientes",
      value: totalPatients.toString(),
      icon: Users,
      iconColor: "text-blue-600",
    },
    {
      title: "Médicos",
      value: totalDoctors.toString(),
      icon: Stethoscope,
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                <Icon className="text-primary h-4 w-4" />
              </div>
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 gap-2">
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
