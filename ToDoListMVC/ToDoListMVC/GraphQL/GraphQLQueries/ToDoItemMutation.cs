using GraphQL.Types;
using ToDoListMVC.Repository.Interfaces;
using ToDoListMVC.Repository;
using ToDoListMVC.GraphQL.GraphQLTypes;
using GraphQL;
using ToDoListMVC.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;

namespace ToDoListMVC.GraphQL.GraphQLQueries
{
    public class ToDoItemMutation : ObjectGraphType
    {
        private readonly DataSourceSwitcher _switcher;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IToDoItemRepository _repo;
        const string HeaderKeyName = "StorageType";

        public ToDoItemMutation(DataSourceSwitcher switcher, IHttpContextAccessor httpContextAccessor)
        {
            _switcher = switcher;
            _httpContextAccessor = httpContextAccessor;
            _repo = _switcher.GetRepository(_switcher.LastDataSourceType);

            Field<StringGraphType>("createToDoItem")
                .Argument<NonNullGraphType<ToDoItemInputType>>("toDoItem")
            .ResolveAsync(async context =>
            {
                    httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HeaderKeyName, out StringValues storageType);
                    if (!storageType.IsNullOrEmpty())
                    {
                        _switcher.GetRepositoryForQuery(ref _repo, storageType);
                    }
                    var toDoItem = context.GetArgument<ToDoItemForCreationInputModel>("toDoItem");
                    await _repo.CreateToDoItemAsync(toDoItem);
                    return "toDoItem created successfully";
                });

            Field<StringGraphType>("deleteToDoItem")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HeaderKeyName, out StringValues storageType);
                    if (!storageType.IsNullOrEmpty())
                    {
                        _switcher.GetRepositoryForQuery(ref _repo, storageType);
                    }
                    int id = context.GetArgument<int>("id");
                    await _repo.DeleteToDoItemAsync(id);
                    return "toDoItem deleted successfully";
                });

            Field<StringGraphType>("completeToDoItem")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HeaderKeyName, out StringValues storageType);
                    if (!storageType.IsNullOrEmpty())
                    {
                        _switcher.GetRepositoryForQuery(ref _repo, storageType);
                    }
                    int id = context.GetArgument<int>("id");
                    await _repo.CompleteToDoItemAsync(id);
                    return "toDoItem is set as completed (or as uncompleted) successfully";
                });
        }
    }
}