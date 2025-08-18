using TodoApp.Domain;

namespace TodoApp.Application;

public class TodoService
{
    private readonly ITodoRepository _repository;

    public TodoService(ITodoRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Todo> GetAll() => _repository.GetAll();

    public Todo? Get(int id) => _repository.Get(id);

    public Todo Add(AddTodoCommand todo) => _repository.Add(todo.Title, todo.IsCompleted);

    public bool Update(UpdateTodoCommand updated)
    {
        var existing = _repository.Get(updated.Id);
        if (existing is null) return false;
        existing.Update(updated.Title, updated.IsCompleted);
        
        return _repository.Update(existing);
    }

    public bool Delete(int id) => _repository.Delete(id);
}