import { Stethoscope } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface DoctorsListProps {
  doctors: {
    id: string;
    name: string;
    avatarImageUrl: string | null;
    specialty: string;
    appointments: number;
  }[];
}

const TopDoctors = ({ doctors }: DoctorsListProps) => {
  return (
    <Card className="mx-auto w-full">
      <CardContent>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="text-muted-foreground" />
            <CardTitle className="text-base">Médicos</CardTitle>
          </div>
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          {doctors.map((doctor, index) => (
            <div key={doctor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`${index === 0 || index === 1 ? "ring-2 ring-blue-500 rounded-full" : ""}`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        doctor.avatarImageUrl ||
                        "/placeholder.svg?height=48&width=48"
                      }
                      alt={doctor.name}
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-sm">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">
                  {doctor.appointments} agend.
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopDoctors;
