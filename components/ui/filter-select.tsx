"use client";

import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
  className,
}: FilterSelectProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-10 rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">Todos</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

