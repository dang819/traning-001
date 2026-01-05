// app/test/layout.tsx

import { TodoProvider } from "@/components/test/todo-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return(
    <TodoProvider>
      {children}
    </TodoProvider>
  );
}