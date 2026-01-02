import React, { useState } from "react";
import { BookOpen, Plus, Pencil, Trash2, Users } from "lucide-react";

import { Layout } from "../layouts/Layout";
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

interface ClassFormData {
  name: string;
  ageGroup: string;
  teacherId: string;
  capacity: number;
}

export const ClassesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClassFormData>({
    name: "",
    ageGroup: "",
    teacherId: "",
    capacity: 20,
  });

  const mockClasses = [
    {
      id: "1",
      name: "Class A",
      ageGroup: "2-3 years",
      teacher: "Mrs. Herath",
      capacity: 20,
      enrolled: 15,
    },
    {
      id: "2",
      name: "Class B",
      ageGroup: "3-4 years",
      teacher: "Mrs. Fernandez",
      capacity: 20,
      enrolled: 18,
    },
    {
      id: "3",
      name: "Class C",
      ageGroup: "4-5 years",
      teacher: "Mr. Jayasinghe",
      capacity: 25,
      enrolled: 22,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Class saved:", formData);
    setFormData({
      name: "",
      ageGroup: "",
      teacherId: "",
      capacity: 20,
    });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <Layout
      title="Class Management"
      description="Assign teachers, manage enrollment, and balance class capacity."
      headerRight={
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Class
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockClasses.map((classItem) => {
            const fillPercent = Math.round((classItem.enrolled / classItem.capacity) * 100);
            return (
              <Card key={classItem.id} className="group">
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {classItem.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{classItem.ageGroup}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(classItem.id);
                        setShowForm(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Teacher
                      </p>
                      <p className="text-sm font-semibold">{classItem.teacher}</p>
                    </div>
                    <Badge variant="secondary">{classItem.enrolled} enrolled</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">
                        {classItem.enrolled}/{classItem.capacity}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {fillPercent}% full
                    </div>
                  </div>
                  <Button variant="outline" className="w-full justify-between">
                    View Details
                    <span className="text-muted-foreground">→</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Class" : "Add New Class"}</DialogTitle>
            <DialogDescription>Create a new class or update existing details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Class name</Label>
              <Input
                placeholder="Class A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Age group</Label>
              <Select
                value={formData.ageGroup}
                onValueChange={(value) => setFormData({ ...formData, ageGroup: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-3">2-3 Years</SelectItem>
                  <SelectItem value="3-4">3-4 Years</SelectItem>
                  <SelectItem value="4-5">4-5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Teacher</Label>
              <Select
                value={formData.teacherId}
                onValueChange={(value) => setFormData({ ...formData, teacherId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher-1">Mrs. Herath</SelectItem>
                  <SelectItem value="teacher-2">Mrs. Fernandez</SelectItem>
                  <SelectItem value="teacher-3">Mr. Jayasinghe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Capacity ({formData.capacity} students)</Label>
              <input
                type="range"
                min="10"
                max="30"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: parseInt(e.target.value, 10) })
                }
                className="w-full accent-primary"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Update" : "Add"} Class</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};
