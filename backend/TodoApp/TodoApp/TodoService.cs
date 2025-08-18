using System.Collections.Concurrent;
using TodoApp;

namespace TodoApp
{
    public class TodoService
    {
        private readonly ITodoRepository _repository;

        public TodoService(ITodoRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Todo> GetAll() => _repository.GetAll();

        public Todo? Get(int id) => _repository.Get(id);

        public Todo Add(Todo todo) => _repository.Add(todo);

        public bool Update(int id, Todo updated) => _repository.Update(id, updated);

        public bool Delete(int id) => _repository.Delete(id);
    }
}
