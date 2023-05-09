using ToDoListMVC.Repository;

namespace ToDoListMVC.Middleware
{
    public class CookieMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly DataSourceSwitcher _switcher;

        public CookieMiddleware(RequestDelegate next, DataSourceSwitcher switcher)
        {
            _next = next;
            _switcher = switcher;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            string? storageType = "";
            if (!httpContext.Request.Cookies.TryGetValue("storageType", out storageType))
            {
                storageType = "db";
                httpContext.Response.Cookies.Append("storageType", storageType);
            }
            _switcher.Switch(storageType);
            Console.WriteLine(storageType);
            Console.WriteLine(_switcher.GetCurrentDataSource());
            await _next.Invoke(httpContext);
        }
    }
}