// components/test/todo-list.tsx

"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodos } from "./todo-context";
import { Todo } from "@/types/todo";
import { TTodoStars } from "./todo-stars";

type TTodoListProps = {
  data: Todo[];
};

export function TTodoList({ data }: TTodoListProps) {
  const { toggle: onChecked } = useTodos();

  if (data.length === 0)
    return (
      <div>
        <p>No Data to present... yet</p>
      </div>
    );

  return (
    <>
      <ul className="flex flex-col gap-2">
        {data.map((element) => (
          <li key={element.id}>
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
              <Checkbox
                id="toggle-2"
                defaultChecked
                checked={element.completed}
                onCheckedChange={() => onChecked(element.id)}
                onChange={() => onChecked(element.id)}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="flex w-full gap-4 font-normal ">
                <p className="flex-1 text-sm leading-none font-medium">
                  {element.title}
                </p>
                <TTodoStars />
                <p className="text-muted-foreground text-sm tabular-nums">
                  {new Date(element.createdAt).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </Label>
          </li>
        ))}
      </ul>
    </>
  );
}
