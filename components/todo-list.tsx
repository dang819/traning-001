// components/todo-list.tsx
"use client";

import type { Todo } from "../types/todo";
import { useTodos } from "./todo-context";
import { TodoRating } from "./todo-rating";

type TodoListProps = {
  todos: Todo[];
};

export function TodoList({ todos }: TodoListProps) {
  const { toggleTodoCompleted } = useTodos();

  function handleToggle(id: number) {
    toggleTodoCompleted(id);
  }

  if (todos.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        No todos for this filter. Try adding one or change the filter.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between rounded border border-slate-200 bg-white px-3 py-2"
        >
          <label className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span
              className={`text-sm ${
                todo.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {todo.title}
            </span>
          </label>

          <div className="ml-3 flex items-center gap-3">
            <TodoRating todoId={todo.id} label={todo.title} />
            <span className="text-[10px] text-slate-400">
              {new Date(todo.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
