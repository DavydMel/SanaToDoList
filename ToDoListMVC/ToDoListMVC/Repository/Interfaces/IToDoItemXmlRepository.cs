using System.Xml;
using ToDoListMVC.Models;
using ToDoListMVC.Models.DTO;

namespace ToDoListMVC.Repository.Interfaces
{
    public interface IToDoItemXmlRepository
    {
        public Task<IEnumerable<ToDoItem>> GetToDoItemsAsync();
        public Task<ToDoItem?> GetToDoItemAsync(int id);
        public Task<IEnumerable<Category>> GetCategoriesAsync();
        public Task CreateToDoItemAsync(ToDoItemForCreationInputModel item);
        public Task DeleteToDoItemAsync(int id);
        public Task CompleteToDoItemAsync(int id);
        public Task<ToDoItem> ParseXmlToDoItemAsync(XmlNode toDoItemXml);
        public Task<Category> ParseXmlCategoryAsync(XmlNode categoryXml);
        public Task<int> FindNextIdAsync();
    }
}