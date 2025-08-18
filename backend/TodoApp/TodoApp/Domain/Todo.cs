namespace TodoApp.Domain
{
    public class Todo
    {
        public Todo()
        {
        }

        public Todo(int id, string title, bool isCompleted)
        {
            Id = id;
            Title = title;
            IsCompleted = isCompleted;
        }

        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}

