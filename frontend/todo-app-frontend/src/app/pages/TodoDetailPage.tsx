"use client";
import React, { useEffect, useState } from "react";
import { todoApi } from "../../api/todoApi";
import { TodoDto } from "../../api/types";

export default function TodoDetailPage({
  id,
  onEdit,
  onBack,
}: {
  id: number;
  onEdit: () => void;
  onBack: () => void;
}) {
  const [todo, setTodo] = useState<TodoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    todoApi
      .getTodo(id)
      .then(setTodo)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div>
      <h2>Todo Details</h2>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>Completed:</strong> {todo.isCompleted ? "Yes" : "No"}
      </p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
