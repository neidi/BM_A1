using System.Collections.Concurrent;
using TodoApp.Domain;

namespace TodoApp.Infrastructure;

public class InMemoryTodoRepository : ITodoRepository
{
    private readonly ConcurrentDictionary<int, Todo> _todos = new();
    private int _nextId = 1;

    public IEnumerable<Todo> GetAll() => _todos.Values;

    public Todo? Get(int id) => _todos.GetValueOrDefault(id);

    public Todo Add(string title, bool isCompleted)
    {
        var id = _nextId++;
        var todo = new Todo(id, title, isCompleted);
        _todos[id] = todo;
        return todo;
    }

    public bool Update(Todo updated)
    {
        if (!_todos.ContainsKey(updated.Id)) return false;
        _todos[updated.Id] = updated;
        return true;
    }

    public bool Delete(int id) => _todos.TryRemove(id, out _);
}