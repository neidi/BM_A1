import { TodoDto } from "./types";
import { request } from "./httpClient";

export const todoApi = {
  getTodos: () => request<TodoDto[]>("/todos"),
  getTodo: (id: number) => request<TodoDto>(`/todos/${id}`),
  createTodo: (todo: Omit<TodoDto, "id">) =>
    request<TodoDto>("/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    }),
  updateTodo: (id: number, todo: Omit<TodoDto, "id">) =>
    request<TodoDto>(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    }),
  deleteTodo: (id: number) =>
    request<void>(`/todos/${id}`, {
      method: "DELETE",
    }),
};
