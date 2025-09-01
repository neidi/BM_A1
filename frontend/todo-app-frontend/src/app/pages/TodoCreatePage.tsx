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
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Unknown error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Create Todo</h2>
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
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
      {error && <div className="mt-4 text-red-500">Error: {error}</div>}
    </div>
  );
}
