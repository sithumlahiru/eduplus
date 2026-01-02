import React from "react";
import { Layout } from "../layouts/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const mockClasses = [
  { id: "1", name: "Class A", teacher: "Mrs. Herath", enrolled: 15, capacity: 20 },
  { id: "2", name: "Class B", teacher: "Mrs. Fernandez", enrolled: 18, capacity: 20 },
];

export const TeacherClasses: React.FC = () => {
  return (
    <Layout title="Classes (View Only)" description="View assigned class details.">
      <div className="grid gap-4 md:grid-cols-2">
        {mockClasses.map((c) => {
          const fill = Math.round((c.enrolled / c.capacity) * 100);
          return (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {c.name}
                  <Badge variant="secondary">{fill}% full</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Teacher: {c.teacher}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Enrollment</span>
                    <span className="font-medium">
                      {c.enrolled}/{c.capacity}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${fill}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};
