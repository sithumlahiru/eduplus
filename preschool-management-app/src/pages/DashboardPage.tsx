import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarCheck,
  Clock,
  Coins,
  GraduationCap,
  Megaphone,
  Users,
} from "lucide-react";

import { Layout } from "../layouts/Layout";
import { useAuthStore } from "../store";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
}

export const DashboardPage: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const headerDateTime = useMemo(() => {
    const formatted = new Intl.DateTimeFormat(undefined, {
      dateStyle: "full",
      timeStyle: "short",
    }).format(now);
    return formatted;
  }, [now]);

  const stats = {
    totalStudents: 156,
    totalClasses: 8,
    totalTeachers: 12,
    attendanceRate: "92%",
    pendingFees: 25,
    enrollmentThisMonth: 12,
  };

  const statCards: StatCard[] = [
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      label: "Total Students",
      value: stats.totalStudents,
      change: "+12 this month",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      label: "Active Classes",
      value: stats.totalClasses,
      change: "All running",
    },
    {
      icon: <CalendarCheck className="h-5 w-5 text-primary" />,
      label: "Attendance Rate",
      value: stats.attendanceRate,
      change: "+2% from last week",
    },
    {
      icon: <Coins className="h-5 w-5 text-primary" />,
      label: "Pending Fees",
      value: stats.pendingFees,
      change: "Due this month",
    },
  ];

  return (
    <Layout
      title="Dashboard"
      description="Track what matters most for your preschool today."
      headerRight={
        <div className="hidden items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm sm:flex">
          <Clock className="h-3.5 w-3.5" />
          <span>{headerDateTime}</span>
        </div>
      }
    >
      <div className="space-y-8">
        <Card className="border-none bg-gradient-to-br from-primary/10 via-white to-secondary/80 shadow-none">
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl">
                Welcome back, {user?.name || "Administrator"}
              </CardTitle>
              <CardDescription className="text-sm">
                Here is your overview for the day. Keep the momentum going.
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 text-xs uppercase tracking-widest">
                <GraduationCap className="h-3.5 w-3.5" />
                Preschool Suite
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-xs uppercase tracking-widest">
                <Clock className="h-3.5 w-3.5" />
                {headerDateTime}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <Card key={card.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{card.value}</div>
                {card.change && (
                  <p className="text-xs text-muted-foreground">{card.change}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from the school floor.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: "New enrollment",
                  detail: "Amara Silva joined Class A",
                  time: "2 hours ago",
                },
                {
                  action: "Attendance marked",
                  detail: "Class A (15 students)",
                  time: "4 hours ago",
                },
                {
                  action: "Fee paid",
                  detail: "Ravi Kumar · LKR 7,500",
                  time: "Today",
                },
                {
                  action: "New announcement",
                  detail: "School closed tomorrow",
                  time: "Yesterday",
                },
              ].map((activity) => (
                <div
                  key={activity.action}
                  className="flex flex-col justify-between gap-2 rounded-lg border p-3 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump right into today’s tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between" onClick={() => navigate("/students")}>
                Add New Student
                <Users className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-between"
                onClick={() => navigate("/attendance")}
              >
                Mark Attendance
                <CalendarCheck className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => navigate("/announcements")}
              >
                Send Announcement
                <Megaphone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => navigate("/fees")}
              >
                View Fee Report
                <Coins className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
