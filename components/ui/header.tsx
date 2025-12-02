"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "./button";

export function Header() {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar cursos, análises..."
              className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
        </div>
      </div>
    </header>
  );
}

