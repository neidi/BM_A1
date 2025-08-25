"use client";
import React, { useEffect, useState } from "react";
import { todoApi } from "../../api/todoApi";
import { TodoDto } from "../../api/types";

export default function TodoEditPage({
  id,
  onSave,
  onCancel,
}: {
  id: number;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [todo, setTodo] = useState<TodoDto | null>(null);
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    todoApi
      .getTodo(id)
      .then((t) => {
        setTodo(t);
        setTitle(t.title);
        setIsCompleted(t.isCompleted);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    try {
      await todoApi.updateTodo(id, { title, isCompleted });
      onSave();
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div>
      <h2>Edit Todo</h2>
      <label>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
