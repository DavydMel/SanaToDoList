namespace ToDoListMVC.Middleware
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseStorageCookie(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CookieMiddleware>();
        }
    }
}