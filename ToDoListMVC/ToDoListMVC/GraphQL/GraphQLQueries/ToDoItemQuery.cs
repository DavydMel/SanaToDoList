using GraphQL;
using GraphQL.Types;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using ToDoListMVC.GraphQL.GraphQLTypes;
using ToDoListMVC.Repository;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.GraphQL.GraphQLQueries
{
    public class ToDoItemQuery : ObjectGraphType
    {
        private readonly DataSourceSwitcher _switcher;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IToDoItemRepository _repo;
        const string HeaderKeyName = "StorageType";

        public ToDoItemQuery(DataSourceSwitcher switcher, IHttpContextAccessor httpContextAccessor)
        {
            _switcher = switcher;
            _httpContextAccessor = httpContextAccessor;
            _repo = _switcher.GetRepositoryWithoutSaving("db");

            Field<ListGraphType<ToDoItemType>>("toDoItems")
                .ResolveAsync(async context => {
                    httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HeaderKeyName, out StringValues storageType);
                    if (!storageType.IsNullOrEmpty())
                    {
                        _switcher.GetRepositoryForQuery(ref _repo, storageType);
                    }
                    return await _repo.GetToDoItemsAsync();
                });

            Field<StringGraphType>("storageType")
                .Resolve(context => _repo is ToDoItemXmlRepository ? "xml" : "db");

            Field<ToDoItemType>("toDoItem")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HeaderKeyName, out StringValues storageType);
                    if (!storageType.IsNullOrEmpty())
                    {
                        _switcher.GetRepositoryForQuery(ref _repo, storageType);
                    }
                    int id = context.GetArgument<int>("id");
                    return await _repo.GetToDoItemAsync(id);
                });

            Field<ListGraphType<CategoryType>>("categories")
                .ResolveAsync(async context => {
                    httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HeaderKeyName, out StringValues storageType);
                    if (!storageType.IsNullOrEmpty())
                    {
                        _switcher.GetRepositoryForQuery(ref _repo, storageType);
                    }
                    return await _repo.GetCategoriesAsync();
                });

            Field<StringGraphType>("changeStorageType")
                .Argument<NonNullGraphType<StringGraphType>>("type")
                .Resolve(context =>
                {
                    string type = context.GetArgument<string>("type");
                    _repo = _switcher.GetRepository(type);
                    return $"Storage type changed to {type}";
                });
        }
    }
}