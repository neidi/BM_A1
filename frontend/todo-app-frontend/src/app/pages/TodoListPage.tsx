"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TodoDto } from "../../api/types";

export default function TodoListPage({ todos }: { todos: TodoDto[] }) {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Todos</h1>
      <button
        onClick={() => router.push("?view=create")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Todo
      </button>
      <ul className="space-y-4">
        {todos.length === 0 ? (
          <li className="text-gray-500">No todos yet.</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded shadow-sm"
            >
              <span
                className={`text-lg ${
                  todo.isCompleted
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => router.push(`?view=detail&id=${todo.id}`)}
                className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                View
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
