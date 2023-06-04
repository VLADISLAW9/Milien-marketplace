using AutoMapper;
using MilienAPI.Models;
using MilienAPI.Models.DTO;
using MilienAPI.Models.Responses;

namespace MilienAPI.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerResponse, Customer>();
            CreateMap<Customer, Account>();
            CreateMap<AdResponse, Ad>();
            CreateMap<Ad, AdResponse>();
            CreateMap<FavoriteAdResponse, FavoriteAd>();
        }
    }
}
