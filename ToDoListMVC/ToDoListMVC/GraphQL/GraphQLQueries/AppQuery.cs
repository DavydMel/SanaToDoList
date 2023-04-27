using GraphQL.Types;
using ToDoListMVC.GraphQL.GraphQLTypes;
using ToDoListMVC.Models;
using ToDoListMVC.Repository;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.GraphQL.GraphQLQueries
{
    public class AppQuery : ObjectGraphType
    {
        private readonly DataSourceSwitcher _switcher;
        private IToDoItemRepository repo;

        public AppQuery(DataSourceSwitcher switcher)
        {
            _switcher = switcher;
            repo = _switcher.GetCurrentDataSource();

            Field<ListGraphType<ToDoItemType>>("toDoItems")
                .ResolveAsync(async context => await repo.GetToDoItemsAsync());
            Field<ListGraphType<CategoryType>>("categories")
                .ResolveAsync(async context => await repo.GetCategoriesAsync());
        }
    }
}