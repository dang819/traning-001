// lib/api.ts
// Thin client-side API wrapper around the /api/todos endpoints.
// Encapsulating fetch logic keeps components cleaner and makes it easier
// to handle errors and typing consistently.

import { Todo } from "../types/todo";

const TODOS_API_URL = "/api/todos";

// Fetch all todos from the API.
export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(TODOS_API_URL, {
    method: "GET",
    // Avoid caching so we always get the latest list for this demo.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

// Create a new todo via POST.
export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(TODOS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const errorMessage = data?.error ?? "Failed to create todo";
    throw new Error(errorMessage);
  }

  return response.json();
}
