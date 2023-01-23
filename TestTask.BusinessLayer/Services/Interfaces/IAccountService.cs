using TestTask.BusinessLayer.Models.Account;

namespace TestTask.BusinessLayer.Services.Interfaces;

public interface IAccountService
{
    Task<TokenResponseModel> SignInAsync(LoginModel model);
    Task<bool> SignUpAsync(CreateUserModel model);
}
