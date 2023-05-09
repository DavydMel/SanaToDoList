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

        public ToDoItemQuery(DataSourceSwitcher switcher)
        {
            _switcher = switcher;

            Field<ListGraphType<ToDoItemType>>("toDoItems")
                .ResolveAsync(async context => await _switcher.GetCurrentDataSource().GetToDoItemsAsync());

            Field<ToDoItemType>("toDoItem")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("id");
                    return await _switcher.GetCurrentDataSource().GetToDoItemAsync(id);
                });

            Field<ListGraphType<CategoryType>>("categories")
                .ResolveAsync(async context => await _switcher.GetCurrentDataSource().GetCategoriesAsync());

            Field<StringGraphType>("changeStorageType")
                .Argument<NonNullGraphType<StringGraphType>>("type")
                .Resolve(context =>
                {
                    string type = context.GetArgument<string>("type");
                    _switcher.Switch(type);
                    return $"Storage type changed to {type}";
                });
        }
    }
}