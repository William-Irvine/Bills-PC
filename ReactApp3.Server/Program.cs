using Microsoft.EntityFrameworkCore;
using ReactApp3.Server.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddAuthorization();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowBillsPC", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://localhost:5173",
            "https://bills-pc.com",
            "http://www.bills-pc.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowBillsPC");


app.UseDefaultFiles();
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
