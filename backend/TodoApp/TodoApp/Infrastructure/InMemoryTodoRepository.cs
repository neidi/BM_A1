using System.Collections.Concurrent;
using TodoApp.Domain;

namespace TodoApp.Infrastructure;

public class InMemoryTodoRepository : ITodoRepository
{
    private readonly ConcurrentDictionary<int, Todo> _todos = new();
    private int _nextId = 1;

    public IEnumerable<Todo> GetAll() => _todos.Values;

    public Todo? Get(int id) => _todos.GetValueOrDefault(id);

    public Todo Add(Todo todo)
    {
        todo.Id = _nextId++;
        _todos[todo.Id] = todo;
        return todo;
    }

    public bool Update(int id, Todo updated)
    {
        if (!_todos.ContainsKey(id)) return false;
        updated.Id = id;
        _todos[id] = updated;
        return true;
    }

    public bool Delete(int id) => _todos.TryRemove(id, out _);
}