// app/test/page.tsx

"use client";

import { TTodoAdd } from "@/components/test/todo-add";
import { TTodoList } from "@/components/test/todo-list";
import { useTodos } from "@/components/test/todo-context";
import { TTodoFilter } from "@/components/test/todo-filters";
import { useState } from "react";
import { Todo, TodoFilter } from "@/types/todo";

function applyFilter(todos: Todo[], filter: TodoFilter): Todo[] {
  switch (filter) {
    case "completed":
      return todos.filter((todo) => todo.completed);

    case "active":
      return todos.filter((todo) => !todo.completed)
  
    case "all":
    default:
      return todos;
  }
}

export default function TestPage() {
  const { todo, isLoading, error } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>("all");
  const filteredTodos = applyFilter(todo, filter);

  return (
    <main className="space-y-7">
      <h1 className="text-4xl">ToDo List app test!</h1>
        <div className="flex flex-col gap-3">
          <TTodoAdd />
          <TTodoFilter currentFilter={filter} onChange={setFilter} />
        </div>
        <section>
          {isLoading && <p role="status" aria-live="polite">Loading...</p>}
          {error && <p role="alert">Please try again later - {error}</p>}
          {!isLoading && !error && <TTodoList data={filteredTodos} />}
        </section>
    </main>
  );
}