using Newtonsoft.Json;
using TestTask.Shared.Exceptions;

namespace TestTask.PresentationLayer.Middlewares;

public class ExceptionMiddleware
{
    private RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next.Invoke(context);
        }
        catch (ServerException ex)
        {
            await HandleExceptionAsync(context, ex);
        }
        catch
        {
            await context.Response.WriteAsync("Something went wrong!");
        }

    }

    private static async Task HandleExceptionAsync(HttpContext context, ServerException exception)
    {
        string result = JsonConvert.SerializeObject(new List<string>(exception.ErrorMessages));
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)exception.Code;
        await context.Response.WriteAsync(result);
    }
}