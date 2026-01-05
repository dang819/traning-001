// components/test/todo-context.tsx

"use client";

import { createTodo, fetchTodos } from "@/lib/api";
import { Todo } from "@/types/todo";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type TodoContextValue = {
  todo: Todo[];
  isLoading: boolean;
  error: string | null;
  get: () => Promise<void>;
  add: (title: string) => Promise<void>;
  toggle: (id: number) => void;
}

type TodoProviderProps = {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export function TodoProvider({children}: TodoProviderProps) {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchTodos();
      setTodo(response);
    } catch (e) {
      const err = e instanceof Error ? e.message : "something went wrong!";
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(()=>{
    get();
  }, [get])

  const add = useCallback(async (title:string) => {
    setError(null);
    try {
      const response = await createTodo(title.trim());
      setTodo((prev) => [response, ...prev]);
    } catch(e) {
      const err = e instanceof Error ? e.message : "something went wrong while adding!";
      setError(err);
    }
  }, [])

  const toggle = useCallback((id: number) => {
    setTodo((prev) => prev.map(
      t => t.id === id ? {...t, completed: !t.completed} : t)
    )
  },[])

  const value = useMemo<TodoContextValue>(
    () => ({
      todo,
      isLoading,
      error,
      get,
      add,
      toggle
    }),
    [
      todo,
      isLoading,
      error,
      get,
      add,
      toggle
    ]
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>

}

export function useTodos(): TodoContextValue {

  const ctx = useContext(TodoContext);
  if(!ctx) throw new Error("useTodos must be used within its provider <TodoProvider>");
  return ctx;

}