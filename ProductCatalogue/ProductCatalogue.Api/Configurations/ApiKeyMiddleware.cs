using System.Net;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ProductCatalogue.Configurations;

public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly LoadEnv _env;
    public ApiKeyMiddleware(RequestDelegate next)
    {
        _next = next;
        _env = new LoadEnv();
    }
    public async Task InvokeAsync(HttpContext context)
    {
        string? userApiKey = context.Request.Headers[_env.GetVariable("API_KEY_HEADER")];

        if (string.IsNullOrWhiteSpace(userApiKey))
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return;
        }
        
        string? systemApiKey = _env.GetVariable("API_KEY");

        if (!userApiKey.Equals(systemApiKey))
        {
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return;
        }
        await _next(context);
    }
}