using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using TestTask.BusinessLayer.Models.Account;
using TestTask.BusinessLayer.Services.Interfaces;

namespace TestTask.PresentationLayer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost]
    [Route("sign-in")]
    public async Task<IActionResult> SignIn(LoginModel model)
    {
        var result = await _accountService.SignInAsync(model);
        return Ok(result);
    }

    [HttpPost]
    [Route("sign-up")]
    public async Task<IActionResult> SignUp(CreateUserModel model)
    {
        var result = await _accountService.SignUpAsync(model);
        return Ok(result);
    }
}
