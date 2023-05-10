using AutoMapper;
using MilienAPI.Models;
using MilienAPI.Models.DTO;

namespace MilienAPI.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerDTO, Customer>();
            CreateMap<AdDTO, Ad>();
        }
    }
}
