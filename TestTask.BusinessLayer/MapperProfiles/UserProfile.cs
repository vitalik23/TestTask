using AutoMapper;
using TestTask.BusinessLayer.Models.Account;
using TestTask.DataAccessLayer.Entities;

namespace TestTask.BusinessLayer.MapperProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<CreateUserModel, User>();
        CreateMap<User, CreateUserModel>();
    }
}
