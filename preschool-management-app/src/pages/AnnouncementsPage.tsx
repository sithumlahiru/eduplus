import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Megaphone, Plus, Trash2 } from "lucide-react";

import { Layout } from "../layouts/Layout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  target: 'all' | 'parents' | 'teachers';
}

export const AnnouncementsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    target: "all" as const,
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "School Closed Tomorrow",
      content: "The preschool will be closed tomorrow due to a public holiday.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      createdBy: "Admin",
      target: "all",
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      content: "Please join us for the monthly parent-teacher meeting on Friday at 3:00 PM.",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      createdBy: "Mrs. Herath",
      target: "parents",
    },
    {
      id: "3",
      title: "Staff Training Session",
      content: "All teachers are requested to attend the training session on Monday.",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: "Admin",
      target: "teachers",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      createdAt: new Date().toISOString(),
      createdBy: "Admin",
      target: formData.target,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: "", content: "", target: "all" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const getTargetBadge = (target: string) => {
    switch (target) {
      case "all":
        return <Badge variant="secondary">All</Badge>;
      case "parents":
        return <Badge variant="success">Parents</Badge>;
      case "teachers":
        return <Badge variant="outline">Teachers</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout
      title="Announcements"
      description="Share important updates with parents and staff."
      headerRight={
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <Megaphone className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {announcement.createdBy} •{" "}
                        {formatDistanceToNow(new Date(announcement.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {announcement.content}
                  </p>
                  <div>{getTargetBadge(announcement.target)}</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-12 text-center text-muted-foreground">
                <Megaphone className="h-10 w-10" />
                <p>No announcements yet. Create one to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create announcement</DialogTitle>
            <DialogDescription>
              Write a clear update and choose who should receive it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Announcement title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Textarea
              placeholder="Write your announcement here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              required
            />
            <Select
              value={formData.target}
              onValueChange={(value) => setFormData({ ...formData, target: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All (Parents & Teachers)</SelectItem>
                <SelectItem value="parents">Parents Only</SelectItem>
                <SelectItem value="teachers">Teachers Only</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Post Announcement</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};
