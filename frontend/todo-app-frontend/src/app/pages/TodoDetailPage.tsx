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
      <h2 className="text-xl font-bold mb-4 text-gray-800">Todo Details</h2>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Title:</span>
        <span className="ml-2 text-gray-900">{todo.title}</span>
      </div>
      <div className="mb-6">
        <span className="font-semibold text-gray-700">Completed:</span>
        <span
          className={`ml-2 px-2 py-1 rounded ${
            todo.isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {todo.isCompleted ? "Yes" : "No"}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
