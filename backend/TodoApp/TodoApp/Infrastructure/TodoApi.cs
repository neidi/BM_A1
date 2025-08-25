using TodoApp.Application;
using TodoApp.Domain;
using TodoApp.Presentation;

namespace TodoApp.Infrastructure;

public static class TodoApi
{
    private static TodoDto ToDto(this Todo todo) =>
        new() { Id = todo.Id, Title = todo.Title, IsCompleted = todo.IsCompleted };

    private static Todo ToDomain(this TodoDto dto) => new(dto.Id, dto.Title, dto.IsCompleted);

    public static void SetupMinimalApi(this WebApplication app)
    {
        app.MapGet("/todos", (TodoService todoService) => todoService.GetAll().Select(ToDto));

        app.MapGet("/todos/{id}", (int id, TodoService todoService) =>
        {
            var todo = todoService.Get(id);
            return todo is not null ? Results.Ok(ToDto(todo)) : Results.NotFound();
        });

        app.MapPost("/todos", (TodoDto dto, TodoService todoService) =>
        {
            var created = todoService.Add(new AddTodoCommand(dto.Title, dto.IsCompleted));
            return Results.Created($"/todos/{created.Id}", ToDto(created));
        });

        app.MapPut("/todos/{id}", (int id, TodoDto dto, TodoService todoService) =>
        {
            var success = todoService.Update(new UpdateTodoCommand(id, dto.Title, dto.IsCompleted));
            return success ? Results.NoContent() : Results.NotFound();
        });

        app.MapDelete("/todos/{id}", (int id, TodoService todoService) =>
        {
            var success = todoService.Delete(id);
            return success ? Results.NoContent() : Results.NotFound();
        });
    }
}