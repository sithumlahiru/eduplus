import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarCheck,
  Coins,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  UserRound,
  Users,
  Menu,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "../store";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

type NavItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: Users },
  { label: "Parents", path: "/parents", icon: UserRound },
  { label: "Classes", path: "/classes", icon: BookOpen },
  { label: "Attendance", path: "/attendance", icon: CalendarCheck },
  { label: "Fees", path: "/fees", icon: Coins },
  { label: "Announcements", path: "/announcements", icon: Megaphone },
];

const teacherNav: NavItem[] = [
  { label: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/teacher/students", icon: Users },
  { label: "Classes", path: "/teacher/classes", icon: BookOpen },
  { label: "Attendance", path: "/teacher/attendance", icon: CalendarCheck },
  { label: "Announcements", path: "/teacher/announcements", icon: Megaphone },
];

const parentNav: NavItem[] = [
  { label: "My Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Children", path: "/my-children", icon: Users },
  { label: "Attendance", path: "/attendance", icon: CalendarCheck },
  { label: "Announcements", path: "/announcements", icon: Megaphone },
];

const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-primary/10 text-primary"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  );

const SidebarNav: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <nav className="space-y-1">
    {items.map((item) => (
      <NavLink key={item.path} to={item.path} className={sidebarLinkClass}>
        <item.icon className="h-4 w-4" />
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

const UserMenu: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ED";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">{user?.name || "EduPlus"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          <span className="text-sm font-medium">{user?.name || "EduPlus Admin"}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const navItems = user?.role === "teacher" ? teacherNav : user?.role === "parent" ? parentNav : adminNav;

  return (
    <aside className="hidden h-screen w-72 flex-col border-r bg-background px-6 py-6 md:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold">EduPlus</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Preschool Suite</p>
        </div>
      </div>

      <div className="mt-8 flex-1 space-y-8">
        <SidebarNav items={navItems} />

        {user?.role !== "teacher" && user?.role !== "parent" && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Management
            </p>
            <SidebarNav items={[{ label: "Settings", path: "/settings", icon: Settings }]} />
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "E"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{user?.name || "EduPlus"}</p>
            <p className="text-xs text-muted-foreground">{user?.role || "Admin"}</p>
          </div>
        </div>
        <UserMenu />
      </div>
    </aside>
  );
};

export const MobileSidebar: React.FC = () => {
  const { user } = useAuthStore();
  const navItems = user?.role === "teacher" ? teacherNav : user?.role === "parent" ? parentNav : adminNav;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">EduPlus</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Preschool Suite</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <SidebarNav items={navItems} />
          {user?.role !== "teacher" && user?.role !== "parent" && (
            <SidebarNav items={[{ label: "Settings", path: "/settings", icon: Settings }]} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const HeaderUserMenu = UserMenu;
