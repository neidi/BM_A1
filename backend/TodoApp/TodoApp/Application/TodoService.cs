using TodoApp.Domain;

namespace TodoApp.Application;

public class TodoService(ITodoRepository repository)
{
    public IEnumerable<Todo> GetAll() => repository.GetAll();

    public Todo? Get(int id) => repository.Get(id);

    public Todo Add(AddTodoCommand todo) => repository.Add(todo.Title, todo.IsCompleted);

    public bool Update(UpdateTodoCommand updated)
    {
        var existing = repository.Get(updated.Id);
        if (existing is null) return false;
        existing.Update(updated.Title, updated.IsCompleted);
        
        return repository.Update(existing);
    }

    public bool Delete(int id) => repository.Delete(id);
}