using GraphQL;
using ToDoListMVC.Context;
using ToDoListMVC.GraphQL.GraphQLSchema;
using ToDoListMVC.Middleware;
using ToDoListMVC.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<DapperContext>();
builder.Services.AddSingleton<DataSourceSwitcher>();
builder.Services.AddControllersWithViews();
builder.Services.AddHttpContextAccessor();

builder.Services.AddGraphQL(builder => builder
            .AddSystemTextJson()
            .AddSchema<ToDoItemSchema>()
            .AddGraphTypes(typeof(ToDoItemSchema).Assembly));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseStorageCookie();

app.UseGraphQL<ToDoItemSchema>();
app.UseGraphQLAltair();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
