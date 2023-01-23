using TestTask.DataAccessLayer.Models.Customers;
using TestTask.DataAccessLayer.Models.Pagination;

namespace TestTask.BusinessLayer.Models.Customers;

public class FilteredAndPagedCustomers
{
    public CustomerFilterModel Filters { get; set; } = new();
    public PaginationFilterModel Pagination { get; set; } = new();
}
