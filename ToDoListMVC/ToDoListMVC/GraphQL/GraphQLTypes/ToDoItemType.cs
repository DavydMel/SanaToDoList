using GraphQL.Types;
using ToDoListMVC.Models;

namespace ToDoListMVC.GraphQL.GraphQLTypes
{
    public class ToDoItemType : ObjectGraphType<ToDoItem>
    {
        public ToDoItemType()
        {
            Field(i => i.id, type: typeof(IdGraphType)).Description("id property from ToDoItem object");
            Field(i => i.category_id, type: typeof(IntGraphType)).Description("category_id property from ToDoItem object");
            Field(i => i.name).Description("name property from ToDoItem object");
            Field(i => i.deadline, type: typeof(DateTimeGraphType), nullable: true).Description("deadline property from ToDoItem object");
            Field(i => i.is_completed, type: typeof(BooleanGraphType)).Description("is_completed property from ToDoItem object");
        }
    }
}