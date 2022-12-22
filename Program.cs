global using AlbumAPI.Models;
global using AlbumAPI.Services.AlbumServices;
global using AlbumAPI.DTOs.Album;
global using AlbumAPI.DTOs;
global using AlbumAPI.DTOs.User;
global using AutoMapper;
global using Microsoft.EntityFrameworkCore;
global using AlbumAPI.Data;
global using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c => {
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme {
        Description = """ Standard Authorization header using Bearer scheme. Example "bearer {token}" """,
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.OperationFilter<SecurityRequirementsOperationFilter>();
});

//Implements NuGet AutoMapper service
builder.Services.AddAutoMapper(typeof(Program).Assembly);

//Create a new instance of the requested album services 
builder.Services.AddScoped<IAlbumService, AlbumService>();

//Create a new instance of the requested user services 
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

//Adds authentication scheme to web service
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//Enable authentication capablities
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
