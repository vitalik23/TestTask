
namespace TestTask.DataAccessLayer.Models.Pagination;

public class PaginationFilterModel
{
    public PaginationFilterModel()
    {
        PageNumber = 1;
        PageSize = 5;
    }

    public PaginationFilterModel(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
    }

    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}
