
/// <summary>
/// XUnit Test Class
/// Tests the IUserService interface implementations
/// </summary>

namespace APITests;
public class UserServiceTests
{
    [Fact]
    public async void GetUsers_ListOfUsers_ReturnsNonEmptyListOfUsers()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Create non-empty list of dummy users
        var dummyUsers = new List<User>
        {
            new User { ID = 1, UserName = "User1", Followers = {}, Followings = {}},
        };

        // Stub the repository method(s) return value(s)
        repository.GetUsers().Returns(Task.FromResult(dummyUsers));
        mapper.Map<UserDTO>(Arg.Any<User>()).Returns(ci =>
        {
            var user = ci.ArgAt<User>(0);
            return new UserDTO
            {
                ID = user.ID,
                UserName = user.UserName,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
            };
        });
        
        // Act
        var result = await userService.GetUsers();

        // Assert
        Assert.True(result.Data!.Count == 1);
    }

    [Fact]
    public async void GetUsers_NoUsers_ReturnsEmptyList()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Create an empty list of dummy users
        var dummyUsers = new List<User>{};

        // Stub the repository method(s) return value(s)
        repository.GetUsers().Returns(Task.FromResult(dummyUsers));
        mapper.Map<UserDTO>(Arg.Any<User>()).Returns(ci =>
        {
            var user = ci.ArgAt<User>(0);
            return new UserDTO
            {
                ID = user.ID,
                UserName = user.UserName,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
            };
        });
        
        // Act
        var result = await userService.GetUsers();

        // Assert
        Assert.True(result.Data!.Count == 0);
    }

    [Fact]
    public async void GetUsersSearch_UsersFound_ReturnsNonEmptyListOfUsers()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Create non-empty list of dummy users
        var dummyUsers = new List<User>
        {
            new User { ID = 1, UserName = "TestUserOne", Followers = {}, Followings = {}},
            new User { ID = 2, UserName = "TestUserTwo", Followers = {}, Followings = {}},
        };

        // Stub the repository method(s) return value(s)
        repository.GetUsers().Returns(Task.FromResult(dummyUsers));
        mapper.Map<UserDTO>(Arg.Any<User>()).Returns(ci =>
        {
            var user = ci.ArgAt<User>(0);
            return new UserDTO
            {
                ID = user.ID,
                UserName = user.UserName,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
            };
        });

        // Act
        var result = await userService.GetUsersSearch("TestUser");

        // Assert
        Assert.True(result.Data!.Count == 2);
        Assert.True(result.Success);
    }

    [Fact]
    public async void GetUsersSearch_NoUsersFound_ReturnsNullData()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Create non-empty list of dummy users
        var dummyUsers = new List<User>
        {
            new User { ID = 1, UserName = "TestUserOne", Followers = {}, Followings = {}},
            new User { ID = 2, UserName = "TestUserTwo", Followers = {}, Followings = {}},
        };

        // Stub the repository method(s) return value(s)
        repository.GetUsers().Returns(Task.FromResult(dummyUsers));
        mapper.Map<UserDTO>(Arg.Any<User>()).Returns(ci =>
        {
            var user = ci.ArgAt<User>(0);
            return new UserDTO
            {
                ID = user.ID,
                UserName = user.UserName,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
            };
        });

        // Act
        var result = await userService.GetUsersSearch("XUnit");

        // Assert
        Assert.Null(result.Data);
        Assert.False(result.Success);
    }

    [Fact]
    public async void GetUserByName_UserFound_ReturnsUser()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "123");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));

        // Create non-empty list of dummy users
        var dummyUser = new User { ID = 1, UserName = "TestUser", Followers = { }, Followings = { } };
        // Create search query 
        var searchQuery = "TestUser";

        // Stub the repository method(s) return value(s)
        repository.GetUserByName(searchQuery).Returns(Task.FromResult(dummyUser));
        mapper.Map<UserDTO>(Arg.Any<User>()).Returns(ci =>
        {
            var user = ci.ArgAt<User>(0);
            return new UserDTO
            {
                ID = user.ID,
                UserName = user.UserName,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
            };
        });
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Act
        var result = await userService.GetUserByName(searchQuery);

        // Assert
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async void GetUserByName_NoUserFound_ReturnsNoUser()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "123");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));

        // Create search query 
        var searchQuery = "TestUser";

        // Stub the repository method(s) return value(s)
        repository.GetUserByName(searchQuery).Returns(Task.FromResult<User?>(null));
        mapper.Map<UserDTO>(Arg.Any<User>()).Returns(ci =>
        {
            var user = ci.ArgAt<User>(0);
            return new UserDTO
            {
                ID = user.ID,
                UserName = user.UserName,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
            };
        });
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Act
        var result = await userService.GetUserByName(searchQuery);

        // Assert
        Assert.Null(result.Data);
        Assert.False(result.Success);
    }

    [Fact]
    public async void GetCurrentUser_UserFound_ReturnsCurrentUser()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));

        // Create non-empty list of dummy users
        var dummyUser = new User { ID = 1, UserName = "CurrentUser"};
    
        // Stub the repository method(s) return value(s)
        repository.GetCurrentUser(1).Returns(Task.FromResult(dummyUser));
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Act
        var result = await userService.GetCurrentUser();

        // Assert
        Assert.NotNull(result.Data);
        Assert.True(result.Success);

    }

    [Fact]
    public async void GetCurrentUser_NoUserFound_ReturnsNoUser()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));

        // Create non-empty list of dummy users
        var dummyUser = new User { ID = 1, UserName = "CurrentUser"};
    
        // Stub the repository method(s) return value(s)
        repository.GetCurrentUser(2).Returns(Task.FromResult(dummyUser));
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Act
        var result = await userService.GetCurrentUser();

        // Assert
        Assert.Null(result.Data);
        Assert.False(result.Success);
    }

}