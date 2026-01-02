import React from "react";
import { Layout } from "../layouts/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const attendanceSummary = {
  present: 20,
  absent: 3,
  late: 1,
};

export const TeacherAttendance: React.FC = () => {
  return (
    <Layout title="Attendance (View Only)" description="Daily attendance snapshot.">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Present</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {attendanceSummary.present}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Absent</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {attendanceSummary.absent}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Late</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {attendanceSummary.late}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
