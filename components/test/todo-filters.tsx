// components/test/todo-filters.tsx

import { TodoFilter } from "@/types/todo";
import { Button } from "@/components/ui/button";

type TTodoFilterProps = {
  currentFilter: TodoFilter;
  onChange: (value: TodoFilter) => void;
};

export function TTodoFilter({ currentFilter, onChange }: TTodoFilterProps) {
  const FILTERS: Array<{ value: TodoFilter; label: string }> = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "active", label: "Active" },
  ];

  return (
    <div className="space-x-3">
      {FILTERS.map((filter) => {
        const isActive = filter.value === currentFilter;
        return (
          <Button
            className="cursor-pointer"
            key={filter.value}
            variant={isActive ? "default" : "outline"}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
