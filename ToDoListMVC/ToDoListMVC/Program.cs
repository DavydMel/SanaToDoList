using GraphQL;
using GraphQL.Instrumentation;
using GraphQL.Server;
using GraphQL.Types;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using ToDoListMVC.Context;
using ToDoListMVC.GraphQL.GraphQLQueries;
using ToDoListMVC.GraphQL.GraphQLSchema;
using ToDoListMVC.GraphQL.GraphQLTypes;
using ToDoListMVC.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<DapperContext>();
builder.Services.AddSingleton<DataSourceSwitcher>();
builder.Services.AddControllersWithViews();

//builder.Services.AddSingleton<ISchema, AppSchema>();
//builder.Services.AddGraphQL(opt => opt.EnableMetrics = false);

builder.Services.AddGraphQL(builder => builder
            .AddSystemTextJson()
            .AddSchema<AppSchema>()
            .AddGraphTypes(typeof(AppSchema).Assembly));

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

app.UseGraphQL<AppSchema>();
app.UseGraphQLAltair();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
