// components/todo-form.tsx

"use client";

import { useState } from "react";
import { useTodos } from "./todo-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TodoForm() {
  const { addTodo } = useTodos();

  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setLocalError("Please enter a title.");
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);

    try {
      await addTodo(trimmedTitle);
      setTitle("");
    } catch {
      setLocalError("Failed to add todo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (localError) setLocalError(null);
  }

  const errorId = localError ? "todo-form-error" : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 items-stretch"
      aria-describedby={errorId}
    >
      <div className="flex-1">
        <Input
          placeholder="Add a new todo…"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(localError)}
          aria-describedby={errorId}
        />

        {localError && (
          <p id="todo-form-error" className="mt-1 text-xs text-red-600">
            {localError}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding…" : "Add"}
      </Button>
    </form>
  );
}
