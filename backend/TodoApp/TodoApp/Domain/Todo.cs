namespace TodoApp.Domain;

public class Todo
{
    public Todo(int id, string title, bool isCompleted)
    {
        Id = id;
        Title = title;
        IsCompleted = isCompleted;
    }

    public int Id { get; }
    public string Title { get; private set; }
    public bool IsCompleted { get; private set; }

    public void Update(string title, bool isCompleted)
    {
        Title = title;
        IsCompleted = isCompleted;
    }
}