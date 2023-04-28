using GraphQL.Types;
using ToDoListMVC.GraphQL.GraphQLQueries;

namespace ToDoListMVC.GraphQL.GraphQLSchema
{
    public class ToDoItemSchema : Schema
    {
        public ToDoItemSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<ToDoItemQuery>();
            Mutation = provider.GetRequiredService<ToDoItemMutation>();
        }
    }
}