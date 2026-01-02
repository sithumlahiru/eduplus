import React from "react";
import { Layout } from "../layouts/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const mockStudents = [
  { id: "1", name: "Amara Silva", class: "Class A", dob: "2020-05-15" },
  { id: "2", name: "Ravi Kumar", class: "Class A", dob: "2020-08-22" },
  { id: "3", name: "Priya Patel", class: "Class B", dob: "2020-03-10" },
];

export const TeacherStudents: React.FC = () => {
  return (
    <Layout title="Students (View Only)" description="Quick look at your current roster.">
      <Card>
        <CardHeader>
          <CardTitle>Class Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of birth</TableHead>
                <TableHead>Class</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.dob}</TableCell>
                  <TableCell>{s.class}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};
