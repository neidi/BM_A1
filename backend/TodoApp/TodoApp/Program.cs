using TodoApp.Application;
using TodoApp.Domain;
using TodoApp.Infrastructure;
using TodoApp.Presentation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<ITodoRepository, InMemoryTodoRepository>();
builder.Services.AddSingleton<TodoService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

TodoDto ToDto(Todo todo) => new() { Id = todo.Id, Title = todo.Title, IsCompleted = todo.IsCompleted };
Todo ToDomain(TodoDto dto) => new(dto.Id, dto.Title, dto.IsCompleted);

app.MapGet("/todos", (TodoService todoService) => todoService.GetAll().Select(ToDto));

app.MapGet("/todos/{id}", (int id, TodoService todoService) =>
{
    var todo = todoService.Get(id);
    return todo is not null ? Results.Ok(ToDto(todo)) : Results.NotFound();
});

app.MapPost("/todos", (TodoDto dto, TodoService todoService) =>
{
    var created = todoService.Add(ToDomain(dto));
    return Results.Created($"/todos/{created.Id}", ToDto(created));
});

app.MapPut("/todos/{id}", (int id, TodoDto dto, TodoService todoService) =>
{
    var success = todoService.Update(id, ToDomain(dto));
    return success ? Results.NoContent() : Results.NotFound();
});

app.MapDelete("/todos/{id}", (int id, TodoService todoService) =>
{
    var success = todoService.Delete(id);
    return success ? Results.NoContent() : Results.NotFound();
});

app.Run();
namespace TodoApp
{
    public partial class Program { }
}