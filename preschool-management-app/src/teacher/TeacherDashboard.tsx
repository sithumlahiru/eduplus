import React from "react";
import { Layout } from "../layouts/Layout";
import { useAuthStore } from "../store";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Layout
      title="Teacher Dashboard"
      description="Quick snapshot of your classroom tools and read-only access."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This portal is read-only. You can view students, classes, attendance, and
            announcements shared by admin.
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {["Students", "Classes", "Attendance"].map((label) => (
            <Card key={label}>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-2xl font-semibold">View only</span>
                <Badge variant="outline">Teacher</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
