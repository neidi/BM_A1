using System.Collections.Generic;

namespace TodoApp
{
    public interface ITodoRepository
    {
        IEnumerable<Todo> GetAll();
        Todo? Get(int id);
        Todo Add(Todo todo);
        bool Update(int id, Todo updated);
        bool Delete(int id);
    }
}

