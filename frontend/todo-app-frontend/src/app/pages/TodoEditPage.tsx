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
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Unknown error");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-500">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-64 text-lg text-red-500">
        Error: {error}
      </div>
    );
  if (!todo)
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-500">
        Todo not found
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Edit Todo</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title:</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6 flex items-center">
        <label className="text-gray-700 font-semibold mr-2">Completed:</label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
