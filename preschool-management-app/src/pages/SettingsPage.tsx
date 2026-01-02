import React, { useState } from "react";

import { Layout } from "../layouts/Layout";
import { useAuthStore } from "../store";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    preschoolName: "EduPlus Preschool",
    email: user?.email || "",
    phone: "+94-701234567",
    address: "123 Main Street, Colombo",
    city: "Colombo",
    principalName: "Mr. Rajapaksa",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings updated:", formData);
    alert("Settings updated successfully!");
  };

  return (
    <Layout
      title="Settings"
      description="Update school details, contacts, and administrative info."
    >
      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Preschool Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Preschool name</Label>
                  <Input
                    value={formData.preschoolName}
                    onChange={(e) => setFormData({ ...formData, preschoolName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Principal name</Label>
                  <Input
                    value={formData.principalName}
                    onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit">Save Settings</Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
