namespace TodoApp.Application;

public record UpdateTodoCommand(int Id, string Title, bool IsCompleted);