using System.ComponentModel.DataAnnotations;

namespace TestTask.DataAccessLayer.Entities;

public class Customer
{
    [Key]
    public string Id { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string Phone { get; set; }

    [StringLength(50)]
    public string CompanyName { get; set; }
}
