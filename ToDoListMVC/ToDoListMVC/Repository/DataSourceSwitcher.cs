using ToDoListMVC.Context;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Repository
{
    public class DataSourceSwitcher
    {
        private readonly DapperContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;
        private IToDoItemRepository _repo;
        public string? DataSourceType { get; set; } = "db";

        public DataSourceSwitcher(
            DapperContext context, 
            IWebHostEnvironment env, 
            IConfiguration configuration
            )
        {
            _context = context;
            _env = env;
            _configuration = configuration;
        }

        public void Switch(string? dataType)
        {
            DataSourceType = dataType;
            if (dataType == "xml")
            {
                _repo = new ToDoItemXmlRepository(_env, _configuration);
            }
            else
            {
                _repo = new ToDoItemDbRepository(_context);
            }
        }

        public IToDoItemRepository GetCurrentDataSource()
        {
            return _repo;
        }
    }
}