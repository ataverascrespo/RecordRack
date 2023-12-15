
/// <summary>
/// XUnit Test Class
/// Tests the IAuthService interface implementations
/// </summary>

namespace APITests;
// Disable a nullablity warning - not pertinent to the test case class
#pragma warning disable CS8620

public class AuthServiceTests
{
    [Fact]
    public async void Login_UserExists_Verified_ValidCreds_ReturnsLoggedInUser()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        // Create an actual configuration instance for use by the test (for JWT)
        var inMemorySettings = new Dictionary<string, string> {
            {"TopLevelKey", "TopLevelValue"},
            {"AppSettings:Token", "December 15th 2023 hello there :)"},
        };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build(); 

        var authService = new AuthService(repository, configuration, httpContextAccessor);
        
        // Create password, and a known salt and hash.
        var password = "password";
        byte[] passwordSalt, passwordHash; 
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            // Generate a salt
            passwordSalt = hmac.Key;

            // Use fixed values for password hash
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
        // Create dummy user
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            VerifiedAt = new DateTime(2001,12,10)
        };

        // Stub the repository method(s) return value(s)
        repository.Login("test@test.com").Returns(Task.FromResult(dummyUser));
    
        // Act
        var result = await authService.Login("test@test.com", password);

        // Assert
        Assert.True(result.Success);
    }

    [Fact]
    public async void Login_UserExists_Verified_InvalidCreds_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        // Create an actual configuration instance for use by the test (for JWT)
        var inMemorySettings = new Dictionary<string, string> {
            {"TopLevelKey", "TopLevelValue"},
            {"AppSettings:Token", "December 15th 2023 hello there :)"},
        };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build(); 

        var authService = new AuthService(repository, configuration, httpContextAccessor);
        
        // Create password, and a known salt and hash.
        var password = "password";
        byte[] passwordSalt, passwordHash; 
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            // Generate a salt
            passwordSalt = hmac.Key;

            // Use fixed values for password hash
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
        // Create dummy user
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            VerifiedAt = new DateTime(2001,12,10)
        };

        // Stub the repository method(s) return value(s)
        repository.Login("test@test.com").Returns(Task.FromResult(dummyUser));
    
        // Act
        var result = await authService.Login("test@test.com", "pass");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Incorrect password entered.", result.ReturnMessage);
    }

    [Fact]
    public async void Login_UserExists_NotVerified_ReturnsLoggedInUser()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        // Create an actual configuration instance for use by the test (for JWT)
        var inMemorySettings = new Dictionary<string, string> {
            {"TopLevelKey", "TopLevelValue"},
            {"AppSettings:Token", "December 15th 2023 hello there :)"},
        };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build(); 

        var authService = new AuthService(repository, configuration, httpContextAccessor);
        
        // Create password, and a known salt and hash.
        var password = "password";
        byte[] passwordSalt, passwordHash; 
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            // Generate a salt
            passwordSalt = hmac.Key;

            // Use fixed values for password hash
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
        // Create dummy user
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
        };

        // Stub the repository method(s) return value(s)
        repository.Login("test@test.com").Returns(Task.FromResult(dummyUser));
    
        // Act
        var result = await authService.Login("test@test.com", password);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("User has not yet verified their account", result.ReturnMessage);
    }

    [Fact]
    public async void Login_UserNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Stub the repository method(s) return value(s)
        repository.Login("test@test.com").Returns(Task.FromResult<User?>(null));
    
        // Act
        var result = await authService.Login("test@test.com", "password");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("That user could not be found.", result.ReturnMessage);
    }

    [Fact]
    public async void Register_ValidCredentials_ReturnsNewUserID()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        // Create an actual configuration instance for use by the test (for email)
        var inMemorySettings = new Dictionary<string, string> {
            {"TopLevelKey", "TopLevelValue"},
            {"SendgridSettings:ApiKey", "MockedApiKey"},
            {"SendgridSettings:FromEmail", "MockedEmail"}
        };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        // Create auth service for this test
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy user
        var registerUser = new User
        {
            ID = 1, 
            Email = "test@test.com",
            UserName = "test"
        };

        // Stub the repository method(s) return value(s)
        repository.Register(registerUser).Returns(Task.CompletedTask);

        // Act
        var result = await authService.Register(registerUser, "password");

        // Assert
        Assert.Equal(1, result.Data);
    }

    [Fact]
    public async void Register_EmailExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create unregistered dummy user
        var newUser = new User
        {
            Email = "test@test.com",
        };

        // Stub the repository method(s) return value(s)
        repository.EmailExists(newUser.Email).Returns(Task.FromResult(true));

        // Act
        var result = await authService.Register(newUser, "password");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("That email address has already been used.", result.ReturnMessage);
    }

    [Fact]
    public async void Register_UsernameExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create unregistered dummy user
        var newUser = new User
        {
            UserName = "test"
        };

        // Stub the repository method(s) return value(s)
        repository.UserExists(newUser.UserName).Returns(Task.FromResult(true));

        // Act
        var result = await authService.Register(newUser, "password");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("That username has already been used.", result.ReturnMessage);
    }

    [Fact]
    public async void Register_EmptyPasswordProvided_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create unregistered dummy user
        var newUser = new User
        {
            UserName = "test"
        };

        // Act
        var result = await authService.Register(newUser, "");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Provide a password.", result.ReturnMessage);
    }

    
    [Fact]
    public async void Logout_RefreshTokenExists_ReturnsSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy data
        var refreshToken = "token";
        var dummyUser = new User
        {
            ID = 1, 
            Email = "test@test.com",
            UserName = "test"
        };

        // Stub the repository method(s) return value(s)
        repository.FindRefreshToken(refreshToken).Returns(Task.FromResult(dummyUser));
        repository.RemoveRefreshToken(dummyUser, refreshToken).Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await authService.Logout(refreshToken);

        // Assert
        Assert.True(result.Success);
        Assert.Equal("Logged user out.", result.ReturnMessage);
    }

    [Fact]
    public async void Logout_RefreshTokenNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy data
        var refreshToken = "token";

        // Stub the repository method(s) return value(s)
        repository.FindRefreshToken(refreshToken).Returns(Task.FromResult<User?>(null));

        // Act
        var result = await authService.Logout(refreshToken);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("That user could not be found.", result.ReturnMessage);
    }

    [Fact]
    public async void ValidateRefreshToken_RefreshTokenExists_ReturnsNewToken()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        // Create an actual configuration instance for use by the test (for JWT)
        var inMemorySettings = new Dictionary<string, string> {
            {"TopLevelKey", "TopLevelValue"},
            {"AppSettings:Token", "December 15th 2023 hello there :)"},
        };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();        
            
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy data
        var refreshToken = "token";
        var dummyUser = new User
        {
            ID = 1, 
            Email = "test@test.com",
            UserName = "test",
            // Add token to list
            RefreshTokens = new List<RefreshToken>
            {
                new RefreshToken 
                {
                    Token = "token",
                    RefreshTokenExpiration = new DateTime(2300, 1, 1)
                }
            }
        };
        // Stub the repository method(s) return value(s)
        repository.FindRefreshToken(refreshToken).Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await authService.ValidateRefreshToken(refreshToken);

        // Assert
        Assert.NotNull(result.Data);
        Assert.True(result.Success);
    }

    [Fact]
    public async void ValidateRefreshToken_RefreshTokenNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy data
        var refreshToken = "token";
        var dummyUser = new User
        {
            ID = 1, 
            Email = "test@test.com",
            UserName = "test",
        };
        // Stub the repository method(s) return value(s)
        repository.FindRefreshToken(refreshToken).Returns(Task.FromResult<User?>(null));

        // Act
        var result = await authService.ValidateRefreshToken(refreshToken);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("This refresh token does not exist.", result.ReturnMessage);
    }

    [Fact]
    public async void VerifyAccount_ValidVerifyToken_ReturnsSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy data
        var verificationToken = "verificationToken";
        var dummyUser = new User
        {
            ID = 1, 
            Email = "test@test.com",
            UserName = "test",
            VerificationToken = "verificationToken"
        };
        // Stub the repository method(s) return value(s)
        repository.FindUserByVerificationToken(verificationToken).Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await authService.Verify(verificationToken);

        // Assert
        Assert.True(result.Success);
    }

    [Fact]
    public async void VerifyAccount_VerifyTokenNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy data
        var verificationToken = "verificationToken";

        // Stub the repository method(s) return value(s)
        repository.FindUserByVerificationToken(verificationToken).Returns(Task.FromResult<User?>(null));

        // Act
        var result = await authService.Verify(verificationToken);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Invalid verification token.", result.ReturnMessage);
    }

    [Fact]
    public async void ForgotPassword_EmailExists_ReturnsSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        // Create an actual configuration instance for use by the test (for email)
        var inMemorySettings = new Dictionary<string, string> {
            {"TopLevelKey", "TopLevelValue"},
            {"SendgridSettings:ApiKey", "MockedApiKey"},
            {"SendgridSettings:FromEmail", "MockedEmail"}
        };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        // Create auth service for this test
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy user
        var email = "test@test.com";
        var dummyUser = new User
        {
            ID = 1, 
            Email = email,
            UserName = "test"
        };

        // Stub the repository method(s) return value(s)
        repository.FindUserByEmail(email).Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await authService.ForgotPassword(email);

        // Assert
        Assert.True(result.Success);
    }

    [Fact]
    public async void ForgotPassword_EmailNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy user
        var email = "test@test.com";

        // Stub the repository method(s) return value(s)
        repository.FindUserByEmail(email).Returns(Task.FromResult<User?>(null));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await authService.ForgotPassword(email);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("User not found.", result.ReturnMessage);
    }

    [Fact]
    public async void ResetPassword_ValidResetTokenExists_ReturnsSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

       // Create dummy user
        var resetToken = "resetToken";
        var expiry = new DateTime(2100, 12, 10);
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            UserName = "test",
            PasswordResetToken = resetToken,
            ResetTokenExpires = expiry
        };

        // Stub the repository method(s) return value(s)
        repository.FindUserByPasswordResetToken(resetToken).Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await authService.ResetPassword(resetToken, "password");

        // Assert
        Assert.True(result.Success);
    }

    [Fact]
    public async void ResetPassword_InvalidResetTokenExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

       // Create dummy user
        var resetToken = "resetToken";
        var expiry = new DateTime(2001, 12, 10);
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            UserName = "test",
            PasswordResetToken = resetToken,
            ResetTokenExpires = expiry
        };

        // Stub the repository method(s) return value(s)
        repository.FindUserByPasswordResetToken(resetToken).Returns(Task.FromResult(dummyUser));

        // Act
        var result = await authService.ResetPassword(resetToken, "password");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Invalid reset token.", result.ReturnMessage);
    }

    [Fact]
    public async void ResetPassword_ResetTokenNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

       // Create dummy user
        var resetToken = "resetToken";

        // Stub the repository method(s) return value(s)
        repository.FindUserByPasswordResetToken(resetToken).Returns(Task.FromResult<User?>(null));

        // Act
        var result = await authService.ResetPassword(resetToken, "password");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("No reset token found.", result.ReturnMessage);
    }

    [Fact]
    public async void ResetPassword_NoPasswordProvided_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instances
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);

        // Create dummy user
        var resetToken = "resetToken";
        var expiry = new DateTime(2100, 12, 10);
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            UserName = "test",
            PasswordResetToken = resetToken,
            ResetTokenExpires = expiry
        };

        // Stub the repository method(s) return value(s)
        repository.FindUserByPasswordResetToken(resetToken).Returns(Task.FromResult(dummyUser));

        // Act
        var result = await authService.ResetPassword(resetToken, "");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Provide a password.", result.ReturnMessage);
    }

    [Fact]
    public async void ChangePassword_EmailExists_ValidOld_ValidNew_ReturnsSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);
        
        // Create password, and a known salt and hash.
        var password = "password";
        byte[] passwordSalt, passwordHash; 
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            // Generate a salt
            passwordSalt = hmac.Key;

            // Use fixed values for password hash
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
        // Create dummy user
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
        };

        // Stub the repository method(s) return value(s)
        repository.FindUserByEmail("test@test.com").Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await authService.ChangePassword("test@test.com", password, "newPassword");

        // Assert
        Assert.True(result.Success);
    }

    [Fact]
    public async void ChangePassword_EmailExists_ValidOld_InvalidNew_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);
        
        // Create password, and a known salt and hash.
        var password = "password";
        byte[] passwordSalt, passwordHash; 
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            // Generate a salt
            passwordSalt = hmac.Key;

            // Use fixed values for password hash
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
        // Create dummy user
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
        };

        // Stub the repository method(s) return value(s)
        repository.FindUserByEmail("test@test.com").Returns(Task.FromResult(dummyUser));
        
        // Act
        var result = await authService.ChangePassword("test@test.com", password, "");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Provide a password.", result.ReturnMessage);
    }

    [Fact]
    public async void ChangePassword_EmailExists_InvalidOld_InvalidNew_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);
        
        // Create dummy user
        var dummyUser = new User
        {
            ID = 1,
            Email = "test@test.com",
            VerifiedAt = new DateTime(2001,12,10)
        };

        // Stub the repository method(s) return value(s)
        repository.FindUserByEmail("test@test.com").Returns(Task.FromResult(dummyUser));
        
        // Act
        var result = await authService.ChangePassword("test@test.com", "oldPassword", "newPassword");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Incorrect password entered.", result.ReturnMessage);
    }

    [Fact]
    public async void ChangePassword_EmailNotExists_InvalidOld_InvalidNew_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAuthRepository>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var configuration = Substitute.For<IConfiguration>();
        var authService = new AuthService(repository, configuration, httpContextAccessor);
        
        // Stub the repository method(s) return value(s)
        repository.FindUserByEmail("test@test.com").Returns(Task.FromResult<User?>(null));
        
        // Act
        var result = await authService.ChangePassword("test@test.com", "oldPassword", "newPassword");

        // Assert
        Assert.False(result.Success);
        Assert.Equal("That user was not found.", result.ReturnMessage);
    }
}