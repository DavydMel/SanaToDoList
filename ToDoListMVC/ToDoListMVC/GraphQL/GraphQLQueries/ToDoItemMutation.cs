using GraphQL.Types;
using ToDoListMVC.Repository.Interfaces;
using ToDoListMVC.Repository;
using ToDoListMVC.GraphQL.GraphQLTypes;
using GraphQL;
using ToDoListMVC.Models.DTO;

namespace ToDoListMVC.GraphQL.GraphQLQueries
{
    public class ToDoItemMutation : ObjectGraphType
    {
        private readonly DataSourceSwitcher _switcher;

        public ToDoItemMutation(DataSourceSwitcher switcher)
        {
            _switcher = switcher;

            Field<StringGraphType>("createToDoItem")
                .Argument<NonNullGraphType<ToDoItemInputType>>("toDoItem")
                .ResolveAsync(async context =>
                {
                    var toDoItem = context.GetArgument<ToDoItemForCreationInputModel>("toDoItem");
                    await _switcher.GetCurrentDataSource().CreateToDoItemAsync(toDoItem);
                    return "toDoItem created successfully";
                });

            Field<StringGraphType>("deleteToDoItem")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("id");
                    await _switcher.GetCurrentDataSource().DeleteToDoItemAsync(id);
                    return "toDoItem deleted successfully";
                });

            Field<StringGraphType>("completeToDoItem")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("id");
                    await _switcher.GetCurrentDataSource().CompleteToDoItemAsync(id);
                    return "toDoItem is set as completed (or as uncompleted) successfully";
                });
        }
    }
}