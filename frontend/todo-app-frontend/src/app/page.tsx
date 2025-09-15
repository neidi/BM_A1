import React from "react";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import TodoEditPage from "./pages/TodoEditPage";
import TodoCreatePage from "./pages/TodoCreatePage";
import { todoApi } from "../api/todoApi";

// Example: SSR navigation state via search params (for demo)
// In real SSR, use Next.js routing and server actions
export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const view = searchParams?.view || "list";
  const id = searchParams?.id ? Number(searchParams.id) : undefined;

  if (view === "list") {
    const todos = await todoApi.getTodos();
    return <TodoListPage todos={todos} />;
  }
  if (view === "detail" && id !== undefined) {
    const todo = await todoApi.getTodo(id).catch(() => null);
    return <TodoDetailPage todo={todo} />;
  }
  if (view === "edit" && id !== undefined) {
    const todo = await todoApi.getTodo(id).catch(() => null);
    return <TodoEditPage todo={todo} />;
  }
  if (view === "create") {
    return <TodoCreatePage />;
  }
  return null;
}
