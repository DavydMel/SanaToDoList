using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ToDoListMVC.Models.DTO
{
    public class ToDoItemForCreationInputModel
    {
        public int category_id { get; set; }

        [Required]
        public string name { get; set; }

        public DateTime? deadline { get; set; }
    }
}