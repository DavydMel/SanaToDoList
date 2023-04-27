using Microsoft.AspNetCore.Mvc;
using ToDoListMVC.Models.DTO;
using ToDoListMVC.Repository;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly DataSourceSwitcher _switcher;
        private IToDoItemRepository _repo;


        public HomeController(DataSourceSwitcher switcher)
        {
            _switcher = switcher;
            _repo = _switcher.GetCurrentDataSource();
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var toDoItemsWhithCategories = new ToDoItemsWithCategoriesViewModel();
            toDoItemsWhithCategories.Type = _switcher.DataSourceType;
            toDoItemsWhithCategories.ToDoItems = await _repo.GetToDoItemsAsync();
            toDoItemsWhithCategories.Categories = await _repo.GetCategoriesAsync();
            return View(toDoItemsWhithCategories);
        }

        [HttpPost]
        public async Task<IActionResult> Index(ToDoItemForCreationInputModel item)
        {
            if (!ModelState.IsValid)
            {
                var toDoItemsWhithCategories = new ToDoItemsWithCategoriesViewModel();
                toDoItemsWhithCategories.ToDoItems = await _repo.GetToDoItemsAsync();
                toDoItemsWhithCategories.Categories = await _repo.GetCategoriesAsync();
                return View(toDoItemsWhithCategories);
            }

            await _repo.CreateToDoItemAsync(item);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> ChangeDataSource(string? sourse = "db")
        {
            _repo = _switcher.Switch(sourse);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
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