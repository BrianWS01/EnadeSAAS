"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Upload,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Cursos",
    href: "/courses",
    icon: GraduationCap,
  },
  {
    title: "Upload ENADE",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Análises",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Alertas",
    href: "/alerts",
    icon: Bell,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold text-primary">ENADE Analytics</h1>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              U
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-muted-foreground">usuario@instituicao.br</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

