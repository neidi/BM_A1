"use client";
import React, { useState } from "react";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import TodoEditPage from "./pages/TodoEditPage";
import TodoCreatePage from "./pages/TodoCreatePage";

type ViewState =
  | { view: "list" }
  | { view: "detail"; id: number }
  | { view: "edit"; id: number }
  | { view: "create" };

export default function Home() {
  const [state, setState] = useState<ViewState>({ view: "list" });

  if (state.view === "list") {
    return (
      <TodoListPage
        onSelectTodo={(id) => setState({ view: "detail", id })}
        onCreateTodo={() => setState({ view: "create" })}
      />
    );
  }
  if (state.view === "detail") {
    return (
      <TodoDetailPage
        id={state.id}
        onEdit={() => setState({ view: "edit", id: state.id })}
        onBack={() => setState({ view: "list" })}
      />
    );
  }
  if (state.view === "edit") {
    return (
      <TodoEditPage
        id={state.id}
        onSave={() => setState({ view: "detail", id: state.id })}
        onCancel={() => setState({ view: "detail", id: state.id })}
      />
    );
  }
  if (state.view === "create") {
    return (
      <TodoCreatePage
        onCreated={() => setState({ view: "list" })}
        onCancel={() => setState({ view: "list" })}
      />
    );
  }
  return null;
}
