// components/todo-context.tsx
"use client";
// This file defines application-level state for todos using React Context.
// The provider fetches todos from the API and exposes them, along with operations,
// to any consumer via the useTodos() hook.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Todo } from "../types/todo";
import { createTodo, fetchTodos } from "../lib/api";

// Shape of the value that our context will expose.
type TodoContextValue = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (title: string) => Promise<void>;
  toggleTodoCompleted: (id: number) => void;
  reload: () => Promise<void>;
};

// Create the context with an initial undefined value so we can detect misuse.
const TodoContext = createContext<TodoContextValue | undefined>(undefined);

type TodoProviderProps = {
  children: ReactNode;
};

// Provider component that wraps any part of the tree that needs access to todos.
export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from the API. Wrapped in useCallback so it can be reused and
  // safely included in dependency arrays.
  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error fetching todos";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load on mount.
  useEffect(() => {
    void reload();
  }, [reload]);

  // Create a new todo via the API, then update local state.
  const addTodo = useCallback(async (title: string) => {
    setError(null);

    try {
      const newTodo = await createTodo(title);
      // Prepend for newest-first ordering.
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error creating todo";
      setError(message);
      // Re-throw so callers (e.g., forms) can react if they want.
      throw err;
    }
  }, []);

  // Toggle completion locally. For demo simplicity we don't persist this to the API.
  const toggleTodoCompleted = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Memoize to avoid re-rendering all consumers when the Provider re-renders
  // for reasons unrelated to the context value.
  const value = useMemo<TodoContextValue>(
    () => ({
      todos,
      isLoading,
      error,
      addTodo,
      toggleTodoCompleted,
      reload,
    }),
    [todos, isLoading, error, addTodo, toggleTodoCompleted, reload]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// Convenience hook to consume the context with a clear error if misused.
export function useTodos(): TodoContextValue {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return ctx;
}
