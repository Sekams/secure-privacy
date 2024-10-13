using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ProductCatalogue.Configurations;

public class ApiKeyHeaderFilter: IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.Parameters == null) {
            operation.Parameters = new List<OpenApiParameter>();
        }
        var env = new LoadEnv();
        operation.Parameters.Add(new OpenApiParameter 
        {
            Name = env.GetVariable("API_KEY_HEADER"),
            In = ParameterLocation.Header,
            Description = "API Access Key",
            Required = true,
        });
    }
}
