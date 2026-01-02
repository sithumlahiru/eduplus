import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock, Save, XCircle } from "lucide-react";

import { Layout } from "../layouts/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState("all");
  const [attendance, setAttendance] = useState<{ [key: string]: "present" | "absent" | "late" }>({});

  const mockStudents = [
    { id: "1", name: "Amara Silva", class: "Class A" },
    { id: "2", name: "Ravi Kumar", class: "Class A" },
    { id: "3", name: "Priya Patel", class: "Class B" },
    { id: "4", name: "Asha Sharma", class: "Class B" },
    { id: "5", name: "Vihaan Singh", class: "Class C" },
  ];

  const filteredStudents =
    selectedClass === "all" ? mockStudents : mockStudents.filter((s) => s.class === selectedClass);

  const handleAttendanceChange = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const handleSubmit = () => {
    console.log("Attendance submitted:", { date: selectedDate, attendance });
    alert("Attendance marked successfully!");
  };

  const presentCount = Object.values(attendance).filter((s) => s === "present").length;
  const absentCount = Object.values(attendance).filter((s) => s === "absent").length;
  const lateCount = Object.values(attendance).filter((s) => s === "late").length;

  return (
    <Layout
      title="Attendance"
      description="Mark daily attendance and track class participation."
      headerRight={
        <Button className="gap-2" onClick={handleSubmit}>
          <Save className="h-4 w-4" />
          Save Attendance
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Class A">Class A (Age 2-3)</SelectItem>
                  <SelectItem value="Class B">Class B (Age 3-4)</SelectItem>
                  <SelectItem value="Class C">Class C (Age 4-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-3">
              <Badge variant="secondary" className="gap-2">
                <Calendar className="h-4 w-4" />
                {selectedDate}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Present</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{presentCount}</CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Absent</CardTitle>
              <XCircle className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{absentCount}</CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm text-muted-foreground">Late</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{lateCount}</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-center">Present</TableHead>
                  <TableHead className="text-center">Absent</TableHead>
                  <TableHead className="text-center">Late</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant={attendance[student.id] === "present" ? "default" : "ghost"}
                        onClick={() => handleAttendanceChange(student.id, "present")}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant={attendance[student.id] === "absent" ? "destructive" : "ghost"}
                        onClick={() => handleAttendanceChange(student.id, "absent")}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant={attendance[student.id] === "late" ? "secondary" : "ghost"}
                        onClick={() => handleAttendanceChange(student.id, "late")}
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
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
