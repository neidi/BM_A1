"use server";
import { redirect } from "next/navigation";

export async function editTodoAction(todoId: number, formData: FormData) {
  const { todoApi } = await import("../../api/todoApi");
  const title = formData.get("title") as string;
  const isCompleted = formData.get("isCompleted") === "on";
  await todoApi.updateTodo(todoId, { title, isCompleted });
  redirect(`/?view=detail&id=${todoId}`);
}
