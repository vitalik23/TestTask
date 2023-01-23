using System.ComponentModel.DataAnnotations;

namespace TestTask.BusinessLayer.Models.Customers;

public class GetCustomerModel
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string CompanyName { get; set; }
}
