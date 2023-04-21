using System.Xml;
using System.Xml.Linq;
using ToDoListMVC.Models;
using ToDoListMVC.Models.DTO;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Repository
{
    public class ToDoItemXmlRepository : IToDoItemXmlRepository
    {
        private readonly string pathToDoItems;
        private readonly string pathCategories;

        public ToDoItemXmlRepository(IWebHostEnvironment env)
        {
            pathToDoItems = string.Concat(env.WebRootPath, "/storage/ToDoItems.xml");
            pathCategories = string.Concat(env.WebRootPath, "/storage/Categories.xml");
        }

        public async Task CompleteToDoItemAsync(int id)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathToDoItems);
            var toDoItemXml = (XmlElement?)doc.SelectSingleNode($"/ToDoItems/ToDoItem[@id={id}]");
            if (toDoItemXml != null) 
            {
                bool oldValue = bool.Parse(toDoItemXml.GetAttribute("is_completed"));
                toDoItemXml.SetAttribute("is_completed", (!oldValue).ToString());
                doc.Save(pathToDoItems);
            }
        }

        public async Task CreateToDoItemAsync(ToDoItemForCreationInputModel item)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathToDoItems);

            XmlElement toDoItem = doc.CreateElement("ToDoItem");
            int id = await FindNextIdAsync();
            toDoItem.SetAttribute("id", id.ToString());
            toDoItem.SetAttribute("category_id", item.category_id.ToString());
            toDoItem.SetAttribute("name", item.name);
            toDoItem.SetAttribute("deadline", item.deadline.ToString());
            toDoItem.SetAttribute("is_completed", false.ToString());

            doc.DocumentElement.AppendChild(toDoItem);
            doc.Save(pathToDoItems);
        }

        public async Task DeleteToDoItemAsync(int id)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathToDoItems);
            var toDoItemXml = doc.SelectSingleNode($"/ToDoItems/ToDoItem[@id={id}]");

            if (toDoItemXml != null)
            {
                doc.DocumentElement.RemoveChild(toDoItemXml);
                doc.Save(pathToDoItems);
            }
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathCategories);
            XmlNodeList? categoriesXml = doc.SelectNodes("/Categories/Category");

            var categories = new List<Category>();
            if (categoriesXml != null)
            {
                foreach (XmlNode categoryXml in categoriesXml)
                {
                    categories.Add(await ParseXmlCategoryAsync(categoryXml));
                }
            }
            return categories;
        }

        public async Task<ToDoItem?> GetToDoItemAsync(int id)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathToDoItems);
            var toDoItemXml = doc.SelectSingleNode($"/ToDoItems/ToDoItem[@id={id}]");
            if (toDoItemXml == null) 
            {
                return null;
            }
            return await ParseXmlToDoItemAsync(toDoItemXml);
        }

        public async Task<IEnumerable<ToDoItem>> GetToDoItemsAsync()
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathToDoItems);
            XmlNodeList? toDoItemsXml = doc.SelectNodes("/ToDoItems/ToDoItem");

            var toDoItems = new List<ToDoItem>();
            if (toDoItemsXml != null)
            {
                foreach (XmlNode toDoItemXml in toDoItemsXml)
                {
                    toDoItems.Add(await ParseXmlToDoItemAsync(toDoItemXml));
                }
            }

            return toDoItems.OrderBy(i => i.is_completed).ThenByDescending(i => i.deadline.HasValue).ThenBy(i => i.deadline); ;
        }

        public async Task<ToDoItem> ParseXmlToDoItemAsync(XmlNode toDoItemXml)
        {
            var toDoItem = new ToDoItem();
            toDoItem.id = int.Parse(toDoItemXml.Attributes["id"].Value);
            toDoItem.category_id = int.Parse(toDoItemXml.Attributes["category_id"].Value);
            toDoItem.name = toDoItemXml.Attributes["name"].Value;
            string? date = toDoItemXml.Attributes["deadline"].Value;
            toDoItem.deadline = string.IsNullOrEmpty(date) ? (DateTime?)null : DateTime.Parse(date);
            toDoItem.is_completed = bool.Parse(toDoItemXml.Attributes["is_completed"].Value);
            return toDoItem;
        }

        public async Task<Category> ParseXmlCategoryAsync(XmlNode categoryXml)
        {
            var category = new Category();
            category.id = int.Parse(categoryXml.Attributes["id"].Value);
            category.name = categoryXml.Attributes["name"].Value;
            return category;
        }

        public async Task<int> FindNextIdAsync()
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(pathToDoItems);
            return doc.SelectNodes("//ToDoItems/ToDoItem")
               .Cast<XmlElement>()
               .Max(c => Int32.Parse(c.Attributes["id"].Value)) + 1;
        }
    }
}