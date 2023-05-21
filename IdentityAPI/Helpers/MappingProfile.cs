using AutoMapper;
using IdentityAPI.Models;
using IdentityAPI.Models.DTO;

namespace IdentityAPI.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDTO, User>();
        }
    }
}
