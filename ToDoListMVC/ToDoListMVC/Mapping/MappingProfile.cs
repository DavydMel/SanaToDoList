using AutoMapper;
using ToDoListMVC.Models;

namespace ToDoListMVC.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            //CreateMap<ToDoItem, ToDoItemView>();
            //CreateMap<Category, ToDoItemView>()
            //    .ForMember(d => d.category_name, a => a.MapFrom(s => s.name));
        }

        //public static TDestination Map<TSource, TDestination>(
        //    this TDestination destination, TSource source)
        //{
        //    return Map(source, destination);
        //}
    }
}