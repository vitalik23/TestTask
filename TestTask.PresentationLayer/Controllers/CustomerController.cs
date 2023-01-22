using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestTask.BusinessLayer.Models.Customers;
using TestTask.BusinessLayer.Services.Interfaces;

namespace TestTask.PresentationLayer.Controllers;

//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase
{

    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateAsync(CreateCustomerModel model)
    {
        var result = await _customerService.CreateAsync(model);
        return Ok(result);
    }

    [HttpPost]
    [Route("update")]
    public async Task<IActionResult> UpdateAsync(UpdateCustomerModel model)
    {
        var result = await _customerService.UpdateAsync(model);
        return Ok(result);
    }

    [HttpGet]
    [Route("delete/{id}")]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        await _customerService.DeleteAsync(id);
        return Ok();
    }

    [HttpGet]
    [Route("get/{id}")]
    public async Task<IActionResult> GetByIdAsync(string id)
    {
        var result = await _customerService.GetCustomerAsync(id);
        return Ok(result);
    }

    [HttpPost]
    [Route("get-all")]
    public async Task<IActionResult> GetAllAsync(FilteredAndPagedCustomers model)
    {
        var result = await _customerService.GetCustomersAsync(model);
        return Ok(result);
    }

    [HttpGet]
    [Route("get-all")]
    public async Task<IActionResult> GetAllAsync()
    {
        var result = await _customerService.GetAllAsync();
        return Ok(result);
    }
}
