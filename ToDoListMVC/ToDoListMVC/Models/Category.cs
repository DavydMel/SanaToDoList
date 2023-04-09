using System.ComponentModel.DataAnnotations;

namespace ToDoListMVC.Models
{
    public class Category
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string name { get; set; }

        //public IList<ToDoItem> toDoItems { get; set; } =  new List<ToDoItem>();
    }
}