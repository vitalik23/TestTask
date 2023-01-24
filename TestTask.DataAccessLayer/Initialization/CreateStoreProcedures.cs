using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using TestTask.Shared.Options;

namespace TestTask.DataAccessLayer.Initialization;

public class CreateStoreProcedures
{
    private ConnectionStrings _connectionString;

    public CreateStoreProcedures(IOptions<ConnectionStrings> connectionStringOption)
    {
        _connectionString = connectionStringOption.Value;
    }

    public void CreateIfNotExistStoreProcedures()
    {
        SqlConnection con = new SqlConnection(_connectionString.DefaultConnection);

        string query = @"CREATE OR ALTER PROCEDURE [dbo].[GetCustomers]
    @Name NVARCHAR(MAX),
	@Email NVARCHAR(MAX),
	@Phone NVARCHAR(MAX),
	@CompanyName NVARCHAR(MAX),
	@OrderBy NVARCHAR(MAX),
	@OrderByAsc NVARCHAR(MAX),
	@PageNumber INT,
	@PageSize INT
AS
BEGIN

	DECLARE @sqlQuery NVARCHAR(MAX);
	DEClARE @expression INT = ((@PageNumber-1) * @PageSize);

	SET @sqlQuery = 'select * from [testtaskdb].[dbo].[Customers] WITH (INDEX (IX_Customers_Email)) ' +
	'where Name LIKE ''%' + @Name + '%'' and ' +
	'Email LIKE ''%' + @Email + '%'' AND ' + 
	'Phone LIKE ''%' + @Phone + '%'' AND ' +
	'CompanyName LIKE ''%' + @CompanyName + '%''' + 
	'order by ' + @OrderBy + ' ' + @OrderByAsc +
	' offset ' + convert(nvarchar(max), @expression) + ' rows ' +
	'fetch next ' + convert(nvarchar(max), @PageSize) + ' rows only'

	EXEC sp_executesql  @sqlQuery
    
END";

        SqlCommand cmd = new SqlCommand(query, con);

        try
        {
            con.Open();
            cmd.ExecuteNonQuery();
            Console.WriteLine("Store Procedure Created Successfully");
        }
        catch (SqlException e)
        {
            Console.WriteLine("Error Generated. Details: " + e.ToString());
        }
        finally
        {
            con.Close();
        }
    }
}
