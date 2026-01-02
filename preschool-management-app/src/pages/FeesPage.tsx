import React, { useState } from "react";
import { Coins, FileText, Send } from "lucide-react";

import { Layout } from "../layouts/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export const FeesPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">(
    "all"
  );

  const mockFees = [
    {
      id: "1",
      studentName: "Amara Silva",
      month: "January 2024",
      amount: 5000,
      status: "paid",
      dueDate: "2024-01-31",
      paidDate: "2024-01-25",
    },
    {
      id: "2",
      studentName: "Ravi Kumar",
      month: "January 2024",
      amount: 5000,
      status: "pending",
      dueDate: "2024-01-31",
      paidDate: null,
    },
    {
      id: "3",
      studentName: "Priya Patel",
      month: "January 2024",
      amount: 5000,
      status: "overdue",
      dueDate: "2024-01-31",
      paidDate: null,
    },
    {
      id: "4",
      studentName: "Asha Sharma",
      month: "January 2024",
      amount: 5000,
      status: "paid",
      dueDate: "2024-01-31",
      paidDate: "2024-01-20",
    },
  ];

  const filteredFees =
    filterStatus === "all" ? mockFees : mockFees.filter((f) => f.status === filterStatus);

  const stats = {
    total: mockFees.reduce((sum, f) => sum + f.amount, 0),
    paid: mockFees.filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0),
    pending: mockFees
      .filter((f) => f.status === "pending")
      .reduce((sum, f) => sum + f.amount, 0),
    overdue: mockFees
      .filter((f) => f.status === "overdue")
      .reduce((sum, f) => sum + f.amount, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="success">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout
      title="Fee Management"
      description="Monitor collections and send payment reminders quickly."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              Rs. {stats.total.toLocaleString()}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Paid</CardTitle>
              <Badge variant="success">Paid</Badge>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              Rs. {stats.paid.toLocaleString()}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Pending</CardTitle>
              <Badge variant="secondary">Pending</Badge>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              Rs. {stats.pending.toLocaleString()}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Overdue</CardTitle>
              <Badge variant="destructive">Overdue</Badge>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              Rs. {stats.overdue.toLocaleString()}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Fee Records</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track invoices, due dates, and receipts in one place.
              </p>
            </div>
            <Tabs value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.studentName}</TableCell>
                    <TableCell>{fee.month}</TableCell>
                    <TableCell>Rs. {fee.amount}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell>{getStatusBadge(fee.status)}</TableCell>
                    <TableCell className="text-right">
                      {fee.status === "paid" ? (
                        <Button variant="ghost" size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          View Receipt
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Send className="h-4 w-4" />
                          Request Payment
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
