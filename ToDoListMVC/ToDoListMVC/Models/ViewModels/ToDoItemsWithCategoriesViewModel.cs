namespace ToDoListMVC.Models.DTO
{
    public class ToDoItemsWithCategoriesViewModel
    {
        public IEnumerable<ToDoItem> ToDoItems { get; set; } = new List<ToDoItem>();
        public IEnumerable<Category> Categories { get; set; } = new List<Category>();
    }
}