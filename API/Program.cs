global using AlbumAPI.Models;
global using AlbumAPI.Services.AlbumServices;
global using AlbumAPI.Services.UserServices;
global using AlbumAPI.DTOs.Album;
global using AlbumAPI.DTOs;
global using AlbumAPI.DTOs.User;
global using AutoMapper;
global using Microsoft.EntityFrameworkCore;
global using AlbumAPI.Data;
global using Microsoft.AspNetCore.Mvc;
global using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;
using API.Services.APIServices;
using API.Services.EmailServices;
using AlbumAPI.Services.EmailServices;
using Sqids;

var builder = WebApplication.CreateBuilder(args);

//Configure AWS systems manager
builder.Configuration.AddSystemsManager(source => {
                        source.Path = "/recordrack";
                        source.ReloadAfter =
                            TimeSpan.FromMinutes(10);
                    });

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORSPolicy",
            builder  =>
            {
                builder
                .WithOrigins("https://recordrack.ca")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();

            });
});

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    
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
builder.Services.AddScoped<IUserService, UserService>();

//Create a new instance of the requested auth services 
builder.Services.AddScoped<IAuthService, AuthService>();

//Create a new instance of the requested user repository  
builder.Services.AddScoped<IUserRepository, UserRepository>();

//Create a new instance of the requested auth repository
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

//Create a new instance of the requested photo service
builder.Services.AddScoped<IPhotoService, PhotoService>();

//Create a new instance of the requested email service
builder.Services.AddScoped<IEmailService, EmailService>();

//Create a new instance of the requested API service and HTTP client to perform HTTP requests
builder.Services.AddHttpClient();
builder.Services.AddScoped<IAPIService, APIService>();

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
builder.Services.AddHttpContextAccessor();

//Instantiate singleton instance of SQID encoder 
builder.Services.AddSingleton(new SqidsEncoder<int>(new()
{
    Alphabet=builder.Configuration.GetSection("SqidsSettings:Alphabet").Value!,
    MinLength = 18,
}));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CORSPolicy");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

//Enable authentication capablities
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
