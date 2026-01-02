import React, { useState } from "react";
import { Search, UserPlus, Pencil, Trash2 } from "lucide-react";

import { Layout } from "../layouts/Layout";
import { useDataStore } from "../store";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
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

interface StudentFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  enrollmentDate: string;
  classId: string;
  parentPhone: string;
  parentEmail: string;
}

export const StudentsPage: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    classId: "",
    parentPhone: "",
    parentEmail: "",
  });

  const mockStudents = [
    {
      id: "1",
      firstName: "Amara",
      lastName: "Silva",
      dateOfBirth: "2020-05-15",
      enrollmentDate: "2023-01-10",
      classId: "Class A",
      status: "active",
    },
    {
      id: "2",
      firstName: "Ravi",
      lastName: "Kumar",
      dateOfBirth: "2020-08-22",
      enrollmentDate: "2023-02-15",
      classId: "Class A",
      status: "active",
    },
    {
      id: "3",
      firstName: "Priya",
      lastName: "Patel",
      dateOfBirth: "2020-03-10",
      enrollmentDate: "2023-01-20",
      classId: "Class B",
      status: "active",
    },
  ];

  const displayStudents = students.length > 0 ? students : mockStudents;
  const filteredStudents = displayStudents.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateStudent(editingId, formData);
      setEditingId(null);
    } else {
      addStudent(formData);
    }
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      enrollmentDate: new Date().toISOString().split("T")[0],
      classId: "",
      parentPhone: "",
      parentEmail: "",
    });
    setShowForm(false);
  };

  const handleEdit = (student: any) => {
    setFormData(student);
    setEditingId(student.id);
    setShowForm(true);
  };

  return (
    <Layout
      title="Student Management"
      description="Track student records, enrollment, and parent contacts in one view."
      headerRight={
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Student
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Students</CardTitle>
              <p className="text-sm text-muted-foreground">
                {filteredStudents.length} student{filteredStudents.length === 1 ? "" : "s"} found
              </p>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell>{student.dateOfBirth}</TableCell>
                    <TableCell>{student.classId}</TableCell>
                    <TableCell>{student.enrollmentDate}</TableCell>
                    <TableCell>
                      <Badge variant="success">{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(student)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteStudent(student.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredStudents.length === 0 && (
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                No students found. Add one to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) {
            setEditingId(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Student" : "Add New Student"}</DialogTitle>
            <DialogDescription>
              Capture student information and link them to a class and parent contact.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollment">Enrollment date</Label>
                <Input
                  id="enrollment"
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Assigned class</Label>
                <Select
                  value={formData.classId}
                  onValueChange={(value) => setFormData({ ...formData, classId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class A">Class A (Age 2-3)</SelectItem>
                    <SelectItem value="Class B">Class B (Age 3-4)</SelectItem>
                    <SelectItem value="Class C">Class C (Age 4-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Parent email</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="parentPhone">Parent phone</Label>
                <Input
                  id="parentPhone"
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Update" : "Add"} Student</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};
