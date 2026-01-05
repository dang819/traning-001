// app/layout.tsx
// Root layout for the App Router. We wrap the tree with TodoProvider here
// so any route can consume the todo context.

import type { Metadata } from "next";
import "./globals.css";
import { TodoProvider } from "../components/todo-context";

export const metadata: Metadata = {
  title: "Todo App Practice",
  description: "Practice Next.js + React + TypeScript + Context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* Provide todos to the entire app */}
        <TodoProvider>
          <div className="max-w-2xl mx-auto py-10 px-4">{children}</div>
        </TodoProvider>
      </body>
    </html>
  );
}
