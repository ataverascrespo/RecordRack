
/// <summary>
/// XUnit Test Class
/// Tests the IUserService interface implementations
/// </summary>

namespace APITests;
// Disable a nullablity warning - not pertinent to the test case class
#pragma warning disable CS8620
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
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy user
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
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

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
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy user
        var dummyUser = new User { ID = 1, UserName = "CurrentUser"};
    
        // Stub the repository method(s) return value(s)
        repository.GetCurrentUser(1).Returns(Task.FromResult(dummyUser));

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
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy user
        var dummyUser = new User { ID = 1, UserName = "CurrentUser"};
    
        // Stub the repository method(s) return value(s)
        repository.GetCurrentUser(2).Returns(Task.FromResult(dummyUser));
       
        // Act
        var result = await userService.GetCurrentUser();

        // Assert
        Assert.Null(result.Data);
        Assert.False(result.Success);
    }

    [Fact]
    public async void FollowUser_UserNotFollowed_ReturnsSuccessfulFollow()
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
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data to be used for stubs
        var dummyFollower = new User { ID = 1, UserName = "Follower"};
        var dummyTarget = new User { ID = 2, UserName = "Target"};
        var dummyFollowing = new UserFollowing { FollowerID = 1, TargetID = 2 };
    
        // Stub the repository method(s) return value(s)
        repository.FollowUserGetFollower(1).Returns(Task.FromResult(dummyFollower));
        repository.FollowUserGetTarget(2).Returns(Task.FromResult(dummyTarget));
        repository.FindFollowing(dummyFollower.ID, dummyTarget.ID).Returns(Task.FromResult<UserFollowing?>(null));
        repository.AddFollowing(dummyFollowing).Returns(Task.CompletedTask);
        repository.SaveChanges().Returns(Task.CompletedTask);
        repository.GetUserFollowersCount(dummyFollower.ID).Returns(Task.FromResult(0));
        repository.GetUserFollowingCount(dummyFollower.ID).Returns(Task.FromResult(1));

        // Act
        var result = await userService.FollowUser(2);

        // Assert
        Assert.NotNull(result.Data);
        Assert.True(result.Success);
        Assert.Equal("Followed user.", result.ReturnMessage);
    }

    [Fact]
    public async void FollowUser_UserWasFollowed_ReturnsSuccessfulUnfollow()
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
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data to be used for stubs
        var dummyFollower = new User { ID = 1, UserName = "Follower"};
        var dummyTarget = new User { ID = 2, UserName = "Target"};
        var dummyFollowing = new UserFollowing { FollowerID = 1, TargetID = 2 };
    
        // Stub the repository method(s) return value(s)
        repository.FollowUserGetFollower(1).Returns(Task.FromResult(dummyFollower));
        repository.FollowUserGetTarget(2).Returns(Task.FromResult(dummyTarget));
        repository.FindFollowing(dummyFollower.ID, dummyTarget.ID).Returns(Task.FromResult(dummyFollowing));
        repository.RemoveFollowing(dummyFollowing).Returns(Task.CompletedTask);
        repository.SaveChanges().Returns(Task.CompletedTask);
        repository.GetUserFollowersCount(dummyFollower.ID).Returns(Task.FromResult(0));
        repository.GetUserFollowingCount(dummyFollower.ID).Returns(Task.FromResult(0));

        // Act
        var result = await userService.FollowUser(2);

        // Assert
        Assert.NotNull(result.Data);
        Assert.True(result.Success);
        Assert.Equal("Unfollowed user.", result.ReturnMessage);
    }

    [Fact]
    public async void GetFollowers_UserFound_ReturnsListOfFollowers()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        // Current USER ID will be 4
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "4");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy target to search followers
        var dummyTarget = new User { ID = 1, UserName = "TestUserOne", Followers = { }, Followings = { } };
        // Create non-empty list of dummy followers
        var dummyFollowers = new List<UserDTO>
        {
            new UserDTO { ID = 2, UserName = "TestUserTwo"},
            new UserDTO { ID = 3, UserName = "TestUserTwo"},
        };

        // Stub the repository method(s) return value(s)
        repository.GetUserByIDWithFollowers(dummyTarget.ID).Returns(Task.FromResult(dummyTarget));
        // Pass dummy target ID = 1 and current user ID = 4
        repository.GetFollowers(dummyTarget.ID, 4).Returns(Task.FromResult(dummyFollowers));

        // Act
        var result = await userService.GetFollowers(dummyTarget.ID);

        // Assert
        Assert.True(result.Data!.Count == 2);
        Assert.True(result.Success);
    }

    [Fact]
    public async void GetFollowers_UserFound_ReturnsEmptyListOfFollowers()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        // Current USER ID will be 4
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "4");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy target to search followers
        var dummyTarget = new User { ID = 1, UserName = "TestUserOne", Followers = { }, Followings = { } };

        // Stub the repository method(s) return value(s)
        repository.GetUserByIDWithFollowers(dummyTarget.ID).Returns(Task.FromResult(dummyTarget));
        // Pass dummy target ID = 1 and current user ID = 4
        repository.GetFollowers(dummyTarget.ID, 4).Returns(Task.FromResult<List<UserDTO>?>(null));

        // Act
        var result = await userService.GetFollowers(dummyTarget.ID);

        // Assert
        Assert.Null(result.Data);
        Assert.True(result.Success);
    }

    [Fact]
    public async void GetFollowers_UserNotFound_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        // Current USER ID will be 4
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "4");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy target to search followers
        var dummyTarget = new User { ID = 1, UserName = "TestUserOne", Followers = { }, Followings = { } };

        // Stub the repository method(s) return value(s)
        repository.GetUserByIDWithFollowers(dummyTarget.ID).Returns(Task.FromResult<User?>(null));

        // Act
        var result = await userService.GetFollowers(dummyTarget.ID);

        // Assert
        Assert.Null(result.Data);
        Assert.False(result.Success);
    }

    [Fact]
    public async void GetFollowing_UserFound_ReturnsListOfFollowing()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        // Current USER ID will be 4
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "4");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy target to search followers
        var dummyFollower = new User { ID = 1, UserName = "TestUserOne", Followers = { }, Followings = { } };
        // Create non-empty list of dummy followers
        var dummyFollowings = new List<UserDTO>
        {
            new UserDTO { ID = 2, UserName = "TestUserTwo"},
            new UserDTO { ID = 3, UserName = "TestUserTwo"},
        };

        // Stub the repository method(s) return value(s)
        repository.GetUserByIDWithFollowers(dummyFollower.ID).Returns(Task.FromResult(dummyFollower));
        // Pass dummy target ID = 1 and current user ID = 4
        repository.GetFollowings(dummyFollower.ID, 4).Returns(Task.FromResult(dummyFollowings));

        // Act
        var result = await userService.GetFollowing(dummyFollower.ID);

        // Assert
        Assert.True(result.Data!.Count == 2);
        Assert.True(result.Success);
    }

    [Fact]
    public async void GetFollowing_UserFound_ReturnsEmptyListOfFollowing()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        // Current USER ID will be 4
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "4");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy target to search followers
        var dummyFollower = new User { ID = 1, UserName = "TestUserOne", Followers = { }, Followings = { } };

        // Stub the repository method(s) return value(s)
        repository.GetUserByIDWithFollowers(dummyFollower.ID).Returns(Task.FromResult(dummyFollower));
        // Pass dummy target ID = 1 and current user ID = 4
        repository.GetFollowings(dummyFollower.ID, 4).Returns(Task.FromResult<List<UserDTO>?>(null));

        // Act
        var result = await userService.GetFollowing(dummyFollower.ID);

        // Assert
        Assert.Null(result.Data);
        Assert.True(result.Success);
    }

    [Fact]
    public async void GetFollowing_UserNotFound_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IUserRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var userService = new UserService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        // Current USER ID will be 4
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "4");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy target to search followers
        var dummyFollower = new User { ID = 1, UserName = "TestUserOne", Followers = { }, Followings = { } };

        // Stub the repository method(s) return value(s)
        repository.GetUserByIDWithFollowers(dummyFollower.ID).Returns(Task.FromResult<User?>(null));

        // Act
        var result = await userService.GetFollowing(dummyFollower.ID);

        // Assert
        Assert.Null(result.Data);
        Assert.False(result.Success);
    }
    
}