using AutoMapper;
using MilienAPI.Models;

namespace MilienAPI.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerDTO, Customer>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));

            CreateMap<Customer, CustomerDTO>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src =>src.Status.ToString()));
        }
    }
}
