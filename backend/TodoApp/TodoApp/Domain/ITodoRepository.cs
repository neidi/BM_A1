namespace TodoApp.Domain;

public interface ITodoRepository
{
    IEnumerable<Todo> GetAll();
    Todo? Get(int id);
    Todo Add(string title, bool isCompleted);
    bool Update(Todo updated);
    bool Delete(int id);
}