using GraphQL;
using GraphQL.Types;
using ToDoListMVC.GraphQL.GraphQLTypes;
using ToDoListMVC.Models;
using ToDoListMVC.Repository;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.GraphQL.GraphQLQueries
{
    public class ToDoItemQuery : ObjectGraphType
    {
        private readonly DataSourceSwitcher _switcher;
        private IToDoItemRepository repo;

        public ToDoItemQuery(DataSourceSwitcher switcher)
        {
            _switcher = switcher;
            repo = _switcher.GetCurrentDataSource();

            Field<ListGraphType<ToDoItemType>>("toDoItems")
                .ResolveAsync(async context => await repo.GetToDoItemsAsync());

            Field<ToDoItemType>("toDoItem")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("id");
                    return await repo.GetToDoItemAsync(id);
                });

            Field<ListGraphType<CategoryType>>("categories")
                .ResolveAsync(async context => await repo.GetCategoriesAsync());

            Field<StringGraphType>("changeStorageType")
                .Argument<NonNullGraphType<StringGraphType>>("type")
                .Resolve(context =>
                {
                    string type = context.GetArgument<string>("type");
                    repo = _switcher.Switch(type);
                    return $"Storage type changed to {type}";
                });
        }
    }
}