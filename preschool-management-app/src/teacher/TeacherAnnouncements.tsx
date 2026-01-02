import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Megaphone } from "lucide-react";

import { Layout } from "../layouts/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const mockAnnouncements = [
  {
    id: "1",
    title: "School Closed Tomorrow",
    content: "Holiday",
    createdAt: new Date().toISOString(),
    createdBy: "Admin",
    target: "all",
  },
  {
    id: "2",
    title: "Meeting",
    content: "PTM",
    createdAt: new Date().toISOString(),
    createdBy: "Mrs Herath",
    target: "parents",
  },
];

export const TeacherAnnouncements: React.FC = () => {
  return (
    <Layout title="Announcements (View Only)" description="Latest school updates.">
      <div className="space-y-4">
        {mockAnnouncements.map((a) => (
          <Card key={a.id}>
            <CardHeader className="flex flex-row items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">{a.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {a.createdBy} •{" "}
                  {formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}
                </p>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{a.content}</CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};
