"use client";
import React, { useState } from "react";
import { todoApi } from "../../api/todoApi";

export default function TodoCreatePage({
  onCreated,
  onCancel,
}: {
  onCreated: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      await todoApi.createTodo({ title, isCompleted });
      onCreated();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Create Todo</h2>
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
      <button onClick={handleCreate}>Create</button>
      <button onClick={onCancel}>Cancel</button>
      {error && <div>Error: {error}</div>}
    </div>
  );
}
