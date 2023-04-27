using GraphQL.Types;
using ToDoListMVC.Models;

namespace ToDoListMVC.GraphQL.GraphQLTypes
{
    public class CategoryType : ObjectGraphType<Category>
    {
        public CategoryType()
        {
            Field(i => i.id, type: typeof(IdGraphType)).Description("id property from Category object");
            Field(i => i.name).Description("name property from ToDoItem object");
        }
    }
}