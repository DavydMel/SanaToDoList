using GraphQL.Types;
using ToDoListMVC.Models.DTO;

namespace ToDoListMVC.GraphQL.GraphQLTypes
{
    public class ToDoItemInputType : InputObjectGraphType<ToDoItemForCreationInputModel>
    {
        public ToDoItemInputType()
        {
            Name = "ToDoItemInput";
            Field(i => i.category_id, type: typeof(IntGraphType));
            Field(i => i.name);
            Field(i => i.deadline, type: typeof(DateTimeGraphType), nullable: true);
        }
    }
}