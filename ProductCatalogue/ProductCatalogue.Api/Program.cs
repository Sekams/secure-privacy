using ProductCatalogue.Api.Services;
using ProductCatalogue.Configurations;

var builder = WebApplication.CreateBuilder(args);
var env = new LoadEnv();

builder.Services.Configure<DatabaseSettings>(env.LoadDBConfigs);
builder.Services.AddSingleton<ProductService>();
builder.Services.AddCors(options => options.AddPolicy("AngularClient", policy => policy.WithOrigins(env.GetVariable("CLIENT_URL")).AllowAnyMethod().AllowAnyHeader()));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config => config.OperationFilter<ApiKeyHeaderFilter>());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("AngularClient");
app.UseMiddleware<ApiKeyMiddleware>();
app.Run();
