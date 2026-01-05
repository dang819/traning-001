// types/todo.ts

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Add a narrow string union for filters.
// This avoids plain `string` and gives us exhaustiveness and autocomplete.
export type TodoFilter = "all" | "active" | "completed";
