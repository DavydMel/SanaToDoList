using GraphQL.Types;
using ToDoListMVC.GraphQL.GraphQLQueries;

namespace ToDoListMVC.GraphQL.GraphQLSchema
{
    public class AppSchema : Schema
    {
        public AppSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<AppQuery>();
        }
    }
}