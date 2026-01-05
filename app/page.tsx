// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import type { Todo, TodoFilter } from "../types/todo";
import { useTodos } from "../components/todo-context";
import { TodoForm } from "../components/todo-form";
import { TodoList } from "../components/todo-list";
import { TodoFilters } from "../components/todo-filters";

const FILTER_LABEL: Record<TodoFilter, string> = {
  all: "all",
  active: "active",
  completed: "completed",
};

function applyFilter(filter: TodoFilter, todos: Todo[]) {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    case "all":
    default:
      return todos;
  }
}

export default function HomePage() {
  const { todos, isLoading, error } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>("all");

  const filteredTodos = useMemo(() => applyFilter(filter, todos), [filter, todos]);

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Todo Practice App</h1>
        <p className="text-sm text-slate-600">
          Next.js App Router + React Context + TypeScript
        </p>
      </header>

      <section className="mb-6">
        <TodoForm />
      </section>

      <section className="mb-4">
        <TodoFilters filter={filter} onChange={setFilter} />

        {isLoading && <p>Loading todos…</p>}

        {error && (
          <p className="text-red-600 text-sm mb-2">
            Error: {error} (try reloading)
          </p>
        )}

        {!isLoading && !error && <TodoList todos={filteredTodos} />}
      </section>

      {!isLoading && !error && (
        <footer className="mt-4 text-xs text-slate-500 flex justify-between">
          <span>Total todos: {todos.length}</span>
          <span>Showing: {FILTER_LABEL[filter]} todos</span>
        </footer>
      )}
    </main>
  );
}
