import { redirect } from "next/navigation";

export default function TodoCreatePage() {
  // Server component: handle form submission via server action
  async function createTodoAction(formData: FormData) {
    "use server";
    const { todoApi } = await import("../../api/todoApi");
    const title = formData.get("title") as string;
    const isCompleted = formData.get("isCompleted") === "on";
    await todoApi.createTodo({ title, isCompleted });
    redirect("/?view=list");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Create Todo</h2>
      <form action={createTodoAction} method="POST">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Title:
          </label>
          <input
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400 text-gray-900"
            required
          />
        </div>
        <div className="mb-6 flex items-center">
          <label className="text-gray-700 font-semibold mr-2">Completed:</label>
          <input
            name="isCompleted"
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
