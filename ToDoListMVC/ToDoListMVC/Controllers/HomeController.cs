using Microsoft.AspNetCore.Mvc;
using ToDoListMVC.Models.DTO;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly IToDoItemRepository _repo;

        public HomeController(IToDoItemRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var toDoItemsWhithCategories = new ToDoItemsWithCategoriesDto();
            toDoItemsWhithCategories.ToDoItems = await _repo.GetToDoItemsAsync();
            toDoItemsWhithCategories.Categories = await _repo.GetCategoriesAsync();
            return View(toDoItemsWhithCategories);
        }

        [HttpPost]
        public async Task<IActionResult> Index(ToDoItemForCreationDto item)
        {
            if (item == null || item.name == null || item.name.Length == 0 || item.name == "")
            {
                ModelState.AddModelError(String.Empty, "Incorrect input");
            }
            if (!ModelState.IsValid)
            {
                var toDoItemsWhithCategories = new ToDoItemsWithCategoriesDto();
                toDoItemsWhithCategories.ToDoItems = await _repo.GetToDoItemsAsync();
                toDoItemsWhithCategories.Categories = await _repo.GetCategoriesAsync();
                return View(toDoItemsWhithCategories);
            }

            await _repo.CreateToDoItemAsync(item);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
            var toDoItem = await _repo.GetToDoItemAsync(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            await _repo.DeleteToDoItemAsync(id);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> CompleteToDoItem(int id)
        {
            var toDoItem = await _repo.GetToDoItemAsync(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            await _repo.CompleteToDoItemAsync(id);
            return RedirectToAction("Index");
        }
    }
}