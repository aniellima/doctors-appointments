import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import getDashboard from "@/data/get-dashboard";
import { auth } from "@/lib/auth";

import { AppointmentsDataTable } from "../appointments/_components/appointments-data-table";
import DateRangePicker from "./_components/date-picker";
import AppointmentsChart from "./_components/revenue-chart";
import StatsCard from "./_components/stats-card";
import TopDoctors from "./_components/top-doctors";
import TopSpecialties from "./_components/top-specialties";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  const { from, to } = await searchParams;
  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`
    );
  }
  const {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsData,
    patients,
    doctors,
  } = await getDashboard({
    from,
    to,
    session: {
      user: {
        clinic: {
          id: session.user.clinic.id,
        },
      },
    },
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Tenha uma visão geral do sua clinica.
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <DateRangePicker></DateRangePicker>
        </PageActions>
      </PageHeader>
      <PageContent>
        <StatsCard
          totalRevenue={Number(totalRevenue || 0)}
          totalAppointments={totalAppointments || 0}
          totalPatients={totalPatients || 0}
          totalDoctors={totalDoctors || 0}
        />
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <AppointmentsChart
            dailyAppointmentsData={dailyAppointmentsData}
          ></AppointmentsChart>
          <TopDoctors doctors={topDoctors}></TopDoctors>
        </div>
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground" />
                <CardTitle className="text-base">
                  Agendamentos de hoje
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <AppointmentsDataTable
                appointments={todayAppointments}
                patients={patients}
                doctors={doctors}
              />
            </CardContent>
          </Card>
          <TopSpecialties topSpecialties={topSpecialties}></TopSpecialties>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
