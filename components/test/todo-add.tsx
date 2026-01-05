// components/test/todo-add.tsx

"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTodos } from "./todo-context";


export function TTodoAdd() {
  const { add: onCreated, isLoading, error } = useTodos();
  const [title, setTitle] = useState("");

  function onInputChange(value: string) {
    setTitle(value);
  }

  async function onClickHandle(event: React.FormEvent) {
    try {
      event.preventDefault();
      await onCreated(title.trim());
      setTitle("");
    } catch(e) {
      throw e;
    }
  }

  if (error) return <p>This option is not available now | ({error})</p>;

  return (
    <form className="flex gap-x-2">
      <Label htmlFor="addTodo"> Add ToDo:</Label>
      <Input
        id="addTodo"
        name="addTodo"
        type="text"
        placeholder="Add a todo item to your list"
        value={title}
        disabled={isLoading}
        onChange={(e) => onInputChange(e.currentTarget.value)}
      />
      <Button
        type="submit"
        onClick={(e) => onClickHandle(e)}
        disabled={title.length === 0 || isLoading}
      >
        {isLoading ? "Adding..." : "Add"}{" "}
      </Button>
    </form>
  );
}
