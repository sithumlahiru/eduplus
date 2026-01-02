import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ShieldCheck, UserRound, Users } from "lucide-react";

import { useAuthStore } from "../store";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (demoEmail: string, role: "admin" | "teacher" | "parent") => {
    const demoUser = {
      id: "1",
      name: role === "admin" ? "Admin" : role === "teacher" ? "Mrs. Herath" : "Mr. Silva",
      email: demoEmail,
      role,
    };
    useAuthStore.setState({ user: demoUser, token: "demo-token-" + role });
    localStorage.setItem("user", JSON.stringify(demoUser));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/60 px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-3xl">EduPlus</CardTitle>
                <CardDescription className="text-base">
                  Preschool management, designed for warm everyday routines.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <Users className="h-5 w-5 text-primary" />,
                  title: "Families aligned",
                  copy: "Keep parents and teachers on the same page.",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5 text-primary" />,
                  title: "Secure access",
                  copy: "Role-based views keep data tidy and safe.",
                },
                {
                  icon: <GraduationCap className="h-5 w-5 text-primary" />,
                  title: "Classroom clarity",
                  copy: "Attendance, fees, and schedules in one place.",
                },
                {
                  icon: <UserRound className="h-5 w-5 text-primary" />,
                  title: "Teacher-friendly",
                  copy: "Quick actions for the day’s priorities.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-background/70 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {item.icon}
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Trusted by Sri Lankan preschools</Badge>
              <Badge variant="outline">Multi-role access</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to continue to the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 rounded-xl border bg-muted/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Demo quick login
              </p>
              <div className="mt-4 space-y-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full justify-between"
                  onClick={() => quickLogin("admin@example.com", "admin")}
                >
                  Admin
                  <ShieldCheck className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => quickLogin("teacher@example.com", "teacher")}
                >
                  Teacher
                  <GraduationCap className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={() => quickLogin("parent@example.com", "parent")}
                >
                  Parent
                  <UserRound className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
