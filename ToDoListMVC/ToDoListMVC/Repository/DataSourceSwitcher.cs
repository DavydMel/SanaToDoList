using ToDoListMVC.Context;
using ToDoListMVC.Repository.Interfaces;

namespace ToDoListMVC.Repository
{
    public class DataSourceSwitcher
    {
        private readonly DapperContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;
        public string? LastDataSourceType { get; set; } = "db";

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

        public IToDoItemRepository GetRepository(string? storageType)
        {
            LastDataSourceType = storageType;
            return GetRepositoryWithoutSaving(storageType);
        }

        public IToDoItemRepository GetRepositoryWithoutSaving(string? storageType)
        {
            if (storageType == "xml")
            {
                return new ToDoItemXmlRepository(_env, _configuration);
            }
            else
            {
                return new ToDoItemDbRepository(_context);
            }
        }

        public void GetRepositoryForQuery(ref IToDoItemRepository repo, string storageType)
        {
            if (storageType == "xml")
            {
                if (repo == null || repo is not ToDoItemXmlRepository)
                {
                    repo = new ToDoItemXmlRepository(_env, _configuration);
                }
            }
            else
            {
                if (repo == null || repo is not ToDoItemDbRepository)
                {
                    repo = new ToDoItemDbRepository(_context);
                }
            }
        }

    }
}