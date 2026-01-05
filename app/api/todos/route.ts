// app/api/todos/route.ts
// Next.js App Router API route for /api/todos.
// This is a purely in-memory mock: data resets on server restart
// or on some serverless deployments between invocations.

import { NextRequest, NextResponse } from "next/server";
import { Todo } from "../../../types/todo";

// Module-level in-memory store for demo purposes.
// In real applications, this would be a database or external service.
let todos: Todo[] = [
  {
    id: 1,
    title: "Learn Next.js App Router",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Review TypeScript utility types",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Enhance router with performant solution",
    completed: false,
    createdAt: new Date().toISOString(),
  },
    {
    id: 4,
    title: "Optimize api endpoints to achive a fast large contentful paint",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

// GET /api/todos - returns all todos
export async function GET(_req: NextRequest) {
  // NextResponse.json handles headers and serialization.
  return NextResponse.json(todos);
}

// POST /api/todos - creates a new todo
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic schema validation (minimal for mock purposes).
    if (!body || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: Date.now(), // Simple id strategy for demo purposes
      title: body.title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Prepend new todo so it appears at the top of the list.
    todos = [newTodo, ...todos];

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    // Generic error handling for malformed JSON, etc.
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
