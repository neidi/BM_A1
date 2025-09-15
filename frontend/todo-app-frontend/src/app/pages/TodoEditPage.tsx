"use client";
import React from "react";
import { TodoDto } from "../../api/types";
import { editTodoAction } from "../actions/editTodoAction";

export default function TodoEditPage({ todo }: { todo: TodoDto | null }) {
  if (!todo)
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-500">
        Todo not found
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Edit Todo</h2>
      <form
        action={(formData) => editTodoAction(todo.id, formData)}
        method="POST"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Title:
          </label>
          <input
            name="title"
            defaultValue={todo.title}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
            required
          />
        </div>
        <div className="mb-6 flex items-center">
          <label className="text-gray-700 font-semibold mr-2">Completed:</label>
          <input
            name="isCompleted"
            type="checkbox"
            defaultChecked={todo.isCompleted}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
