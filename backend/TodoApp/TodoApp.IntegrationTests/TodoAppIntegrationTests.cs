using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using AwesomeAssertions;
using TodoApp.Presentation;

namespace TodoApp.IntegrationTests;

public class TodoAppIntegrationTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task GetById_WhenTodoItemWasCreatedBefore_GetsTodo()
    {
        var newTodo = new TodoDto { Title = "Test Todo", IsCompleted = false };
        var createResponse = await _client.PostAsJsonAsync("/todos", newTodo);
        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await createResponse.Content.ReadFromJsonAsync<TodoDto>();
        created.Should().NotBeNull();
        created.Title.Should().Be("Test Todo");
        created.IsCompleted.Should().Be(false);

        var getResponse = await _client.GetAsync($"/todos/{created.Id}");
        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var fetched = await getResponse.Content.ReadFromJsonAsync<TodoDto>();
        fetched.Should().NotBeNull();
        fetched.Id.Should().Be(created.Id);
        fetched.Title.Should().Be("Test Todo");
        fetched.IsCompleted.Should().Be(false);
    }

    [Fact]
    public async Task Update_WhenTodoItemWasCreatedBefore_ItemIsUpdated()
    {
        var newTodo = new TodoDto { Title = "Initial", IsCompleted = false };
        var createResponse = await _client.PostAsJsonAsync("/todos", newTodo);
        var created = await createResponse.Content.ReadFromJsonAsync<TodoDto>();

        var updatedTodo = new TodoDto { Id = created!.Id, Title = "Updated", IsCompleted = true };
        var updateResponse = await _client.PutAsJsonAsync($"/todos/{created.Id}", updatedTodo);
        updateResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var getResponse = await _client.GetAsync($"/todos/{created.Id}");
        var fetched = await getResponse.Content.ReadFromJsonAsync<TodoDto>();
        fetched!.Title.Should().Be("Updated");
        fetched.IsCompleted.Should().Be(true);
    }

    [Fact]
    public async Task Delete_WhenTodoItemWasCreatedBefore_ItemIsNoLongerFound()
    {
        var newTodo = new TodoDto { Title = "ToDelete", IsCompleted = false };
        var createResponse = await _client.PostAsJsonAsync("/todos", newTodo);
        var created = await createResponse.Content.ReadFromJsonAsync<TodoDto>();

        var deleteResponse = await _client.DeleteAsync($"/todos/{created!.Id}");
        deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var getResponse = await _client.GetAsync($"/todos/{created.Id}");
        getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task GetAll_WhenItemsWereCreated_ReturnsItems()
    {
        var todo1 = new TodoDto { Title = "First", IsCompleted = false };
        var todo2 = new TodoDto { Title = "Second", IsCompleted = true };
        await _client.PostAsJsonAsync("/todos", todo1);
        await _client.PostAsJsonAsync("/todos", todo2);

        var listResponse = await _client.GetAsync("/todos");
        listResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var todos = await listResponse.Content.ReadFromJsonAsync<List<TodoDto>>();
        todos.Should().NotBeNull();
        todos.Count.Should().BeGreaterThanOrEqualTo(2);
        todos.Any(t => t.Title == "First").Should().Be(true);
        todos.Any(t => t.Title == "Second").Should().Be(true);
    }
}

