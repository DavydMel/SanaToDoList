using Microsoft.AspNetCore.Mvc;
using ToDoListMVC.Models;
using ToDoListMVC.Models.DTO;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly IToDoItemDbRepository _repo;
        private readonly IToDoItemXmlRepository _repoXml;


        public HomeController(IToDoItemDbRepository repo, IToDoItemXmlRepository repoXml)
        {
            _repo = repo;
            _repoXml = repoXml;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string? type = "db")
        {
            var toDoItemsWhithCategories = new ToDoItemsWithCategoriesViewModel();
            toDoItemsWhithCategories.Type = type;
            if (type != "db")
            {
                toDoItemsWhithCategories.ToDoItems = await _repoXml.GetToDoItemsAsync();
                toDoItemsWhithCategories.Categories = await _repoXml.GetCategoriesAsync();
            }
            else
            {
                toDoItemsWhithCategories.ToDoItems = await _repo.GetToDoItemsAsync();
                toDoItemsWhithCategories.Categories = await _repo.GetCategoriesAsync();
            }
            return View(toDoItemsWhithCategories);
        }
         
        [HttpPost]
        public async Task<IActionResult> Index(ToDoItemForCreationInputModel item)
        {
            if (!ModelState.IsValid)
            {
                var toDoItemsWhithCategories = new ToDoItemsWithCategoriesViewModel();
                toDoItemsWhithCategories.Type = item.type;
                if (item.type != "db")
                {
                    toDoItemsWhithCategories.ToDoItems = await _repoXml.GetToDoItemsAsync();
                    toDoItemsWhithCategories.Categories = await _repoXml.GetCategoriesAsync();
                }
                else
                {
                    toDoItemsWhithCategories.ToDoItems = await _repo.GetToDoItemsAsync();
                    toDoItemsWhithCategories.Categories = await _repo.GetCategoriesAsync();
                }
                return View(toDoItemsWhithCategories);
            }

            if (item.type != "db")
            {
                await _repoXml.CreateToDoItemAsync(item);
            }
            else
            {
                await _repo.CreateToDoItemAsync(item);
            }
            
            return RedirectToAction("Index", new { type = item.type });
        }

        [HttpGet]
        public async Task<IActionResult> DeleteToDoItem(int id, string? type = "db")
        {
            if (type != "db")
            {
                await _repoXml.DeleteToDoItemAsync(id);
            }
            else
            {
                await _repo.DeleteToDoItemAsync(id);
            }
            return RedirectToAction("Index", new { type = type });
        }

        [HttpGet]
        public async Task<IActionResult> CompleteToDoItem(int id, string? type = "db")
        {
            if (type != "db")
            {
                var toDoItem = await _repoXml.GetToDoItemAsync(id);
                if (toDoItem == null)
                {
                    return NotFound();
                }
                await _repoXml.CompleteToDoItemAsync(id);
            }
            else
            {
                var toDoItem = await _repo.GetToDoItemAsync(id);
                if (toDoItem == null)
                {
                    return NotFound();
                }
                await _repo.CompleteToDoItemAsync(id);
            }

            return RedirectToAction("Index", new { type = type });
        }
    }
}