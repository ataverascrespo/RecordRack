global using AlbumAPI.Models;
global using AlbumAPI.Services.AlbumServices;
global using AlbumAPI.DTOs.Album;
global using AlbumAPI.DTOs;
global using AlbumAPI.DTOs.User;
global using AutoMapper;
global using Microsoft.EntityFrameworkCore;
global using AlbumAPI.Data;
global using Microsoft.AspNetCore.Mvc;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Implements NuGet AutoMapper service
builder.Services.AddAutoMapper(typeof(Program).Assembly);

//Create a new instance of the requested album services 
builder.Services.AddScoped<IAlbumService, AlbumService>();

//Create a new instance of the requested user services 
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

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
app.Run();
