using Dapper;
using System.Data;
using ToDoListMVC.Context;
using ToDoListMVC.Models;
using ToDoListMVC.Models.DTO;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Repository
{
    public class ToDoItemDbRepository : IToDoItemRepository
    {
        private readonly DapperContext _context;

        public ToDoItemDbRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task CompleteToDoItemAsync(int id)
        {
            string query = "UPDATE ToDoItem SET is_completed = ~is_completed WHERE id = @id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public async Task CreateToDoItemAsync(ToDoItemForCreationInputModel item)
        {
            var query = "INSERT INTO ToDoItem (category_id, name, deadline, is_completed) VALUES (@category_id, @name, @deadline, 0)";

            var parameters = new DynamicParameters();
            parameters.Add("category_id", item.category_id, DbType.Int32);
            parameters.Add("name", item.name, DbType.String);
            parameters.Add("deadline", item.deadline, DbType.DateTime);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);   
            }
        }

        public async Task DeleteToDoItemAsync(int id)
        {
            string query = "DELETE FROM ToDoItem WHERE id = @id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            string query = "SELECT * FROM Category";

            using (var connection = _context.CreateConnection())
            {
                var categories = await connection.QueryAsync<Category>(query);
                return categories.ToList();
            }
        }

        public async Task<ToDoItem> GetToDoItemAsync(int id)
        {
            string query = "SELECT * FROM ToDoItem WHERE id = @id";

            using (var connection = _context.CreateConnection())
            {
                var toDoItem = await connection.QuerySingleOrDefaultAsync<ToDoItem>(query, new { id });
                return toDoItem;
            }
        }

        public async Task<IEnumerable<ToDoItem>> GetToDoItemsAsync()
        {
            string query = "SELECT * FROM ToDoItem";

            using (var connection = _context.CreateConnection())
            {
                var toDoItems = await connection.QueryAsync<ToDoItem>(query);

                toDoItems = toDoItems.OrderBy(i => i.is_completed).ThenByDescending(i => i.deadline.HasValue).ThenBy(i => i.deadline);
                return toDoItems.Distinct().ToList();
            }
        }
    }
}