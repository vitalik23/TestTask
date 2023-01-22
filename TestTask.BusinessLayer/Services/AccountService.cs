using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Net;
using TestTask.BusinessLayer.Models.Account;
using TestTask.BusinessLayer.Providers;
using TestTask.BusinessLayer.Services.Interfaces;
using TestTask.DataAccessLayer.Entities;
using TestTask.Shared.Exceptions;

namespace TestTask.BusinessLayer.Services;

public class AccountService : IAccountService
{
    private readonly UserManager<User> _userManager;
    private readonly JwtProvider _jwtProvider;
    private readonly IMapper _mapper;

    public AccountService(
        UserManager<User> userManager,
        JwtProvider jwtProvider,
        IMapper mapper)
    {
        _userManager = userManager;
        _jwtProvider = jwtProvider;
        _mapper = mapper;
    }

    public async Task<TokenResponseModel> SignInAsync(LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user is null)
        {
            throw new ServerException("User not found!", HttpStatusCode.NotFound);
        }

        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            throw new ServerException("Wrong password!", HttpStatusCode.BadRequest);
        }

        var claims = await _jwtProvider.GetUserClaimsAsync(user.Email);
        string accessToken = _jwtProvider.GenerateAccessToken(claims);

        var token = new TokenResponseModel
        {
            AccessToken = accessToken
        };

        return token;
    }

    public async Task<bool> SignUpAsync(CreateUserModel model)
    {
        var existingUser = await _userManager.FindByEmailAsync(model.Email);

        if (existingUser is not null)
        {
            throw new ServerException("User already exist!", HttpStatusCode.BadRequest);
        }

        if (!model.Password.Equals(model.ConfirmPassword))
        {
            throw new ServerException("Passwords do not match!", HttpStatusCode.BadRequest);
        }

        var user = _mapper.Map<User>(model);
        user.UserName = model.Email;

        var newUser = await _userManager.CreateAsync(user, model.Password);

        return newUser.Succeeded;
    }
}
