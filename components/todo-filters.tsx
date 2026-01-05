// components/todo-filters.tsx
"use client";

import type { TodoFilter } from "../types/todo";
import { Button } from "@/components/ui/button";

type TodoFiltersProps = {
  filter: TodoFilter;
  onChange: (nextFilter: TodoFilter) => void;
};

const FILTER_OPTIONS: Array<{ value: TodoFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function TodoFilters({ filter, onChange }: TodoFiltersProps) {
  return (
    <div className="flex gap-2 mb-3 text-xs">
      {FILTER_OPTIONS.map(({ value, label }) => {
        const isActive = value === filter;

        return (
          <Button
            key={value}
            type="button"
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(value)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
