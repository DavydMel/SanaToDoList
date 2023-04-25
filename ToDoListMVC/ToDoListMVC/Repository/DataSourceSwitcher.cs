using ToDoListMVC.Context;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Repository
{
    public class DataSourceSwitcher
    {
        private readonly DapperContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;
        public string? DataSourceType { get; set; } = "";

        public DataSourceSwitcher(DapperContext context, IWebHostEnvironment env, IConfiguration configuration)
        {
            _context = context;
            _env = env;
            _configuration = configuration;
        }

        public IToDoItemRepository Switch(string? dataType)
        {
            DataSourceType = dataType;
            if (dataType == "xml")
            {
                return new ToDoItemXmlRepository(_env, _configuration);
            }
            return new ToDoItemDbRepository(_context);
        }

        public IToDoItemRepository GetCurrent()
        {
            if (DataSourceType == "xml")
            {
                return new ToDoItemXmlRepository(_env, _configuration);
            }
            return new ToDoItemDbRepository(_context);
        }
    }
}