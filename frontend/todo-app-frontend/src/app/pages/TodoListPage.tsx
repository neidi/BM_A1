"use client";
import React, { useEffect, useState } from "react";
import { todoApi } from "../../api/todoApi";
import { TodoDto } from "../../api/types";

export default function TodoListPage({
  onSelectTodo,
  onCreateTodo,
}: {
  onSelectTodo: (id: number) => void;
  onCreateTodo: () => void;
}) {
  const [todos, setTodos] = useState<TodoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    todoApi
      .getTodos()
      .then(setTodos)
      .catch((e) => {
        debugger;
        return setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={onCreateTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => onSelectTodo(todo.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
