using System.Net;

namespace TestTask.Shared.Exceptions;

public class ServerException : Exception
{
    public HttpStatusCode Code { get; set; }
    public List<string> ErrorMessages { get; set; } = new();
    public ServerException(string error, HttpStatusCode errorCode = HttpStatusCode.InternalServerError)
    {
        Code = errorCode;
        ErrorMessages.Add(error);
    }

    public ServerException(List<string> errorMessages, HttpStatusCode errorCode = HttpStatusCode.InternalServerError)
    {
        ErrorMessages = new List<string>(errorMessages);
        Code = errorCode;
    }
}
