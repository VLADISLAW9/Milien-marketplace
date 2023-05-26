using AutoMapper;
using ServiceAPI.Models.DTO;

namespace ServiceAPI.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PaidAdDTO, AdDTO>();
            CreateMap<AdDTO, PaidAdDTO>();
        }
    }
}
