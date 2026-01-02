import React, { useState } from "react";
import { Mail, MapPin, Phone, Plus, Search, Pencil, Trash2 } from "lucide-react";

import { Layout } from "../layouts/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export const ParentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockParents = [
    {
      id: "1",
      name: "Mr. Silva",
      email: "silva@example.com",
      phone: "+94-701234567",
      children: ["Amara Silva"],
      address: "123 Main St, Colombo",
    },
    {
      id: "2",
      name: "Mr. Kumar",
      email: "kumar@example.com",
      phone: "+94-702234567",
      children: ["Ravi Kumar"],
      address: "456 Oak Ave, Kandy",
    },
    {
      id: "3",
      name: "Mr. Patel",
      email: "patel@example.com",
      phone: "+94-703234567",
      children: ["Priya Patel"],
      address: "789 Pine Rd, Galle",
    },
  ];

  const filteredParents = mockParents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout
      title="Parent Management"
      description="Contact details and guardianship overview for every child."
      headerRight={
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Parent
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Parents & Guardians</CardTitle>
              <p className="text-sm text-muted-foreground">
                {filteredParents.length} parent{filteredParents.length === 1 ? "" : "s"} listed
              </p>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredParents.map((parent) => (
            <Card key={parent.id} className="group">
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{parent.name}</CardTitle>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {parent.phone}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                  <Button size="icon" variant="ghost">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span className="break-words">{parent.email}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{parent.address}</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Children
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {parent.children.map((child) => (
                      <Badge key={child} variant="secondary">
                        {child}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredParents.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No parents found.
          </div>
        )}
      </div>
    </Layout>
  );
};
