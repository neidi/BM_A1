using TodoApp.Domain;

namespace TodoApp.Application;

public record AddTodoCommand(string Title, bool IsCompleted = false);