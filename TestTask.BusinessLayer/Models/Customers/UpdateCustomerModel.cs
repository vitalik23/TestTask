using System.ComponentModel.DataAnnotations;

namespace TestTask.BusinessLayer.Models.Customers;

public class UpdateCustomerModel
{
    public string Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Phone { get; set; }

    [Required]
    [StringLength(50)]
    public string CompanyName { get; set; }
}
