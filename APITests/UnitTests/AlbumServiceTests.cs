using AlbumAPI.DTOs.Album;

/// <summary>
/// XUnit Test Class
/// Tests the IAuthService interface implementations
/// </summary>
namespace APITests;
// Disable a nullablity warning - not pertinent to the test case class
#pragma warning disable CS8620

public class AlbumServiceTests
{
    [Fact]
    public async void GetAllAlbums_ReturnsListOfAlbums()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });
        // Create dummy data
        var dummyList = new List<Album> {
            new Album {ID = 1, AlbumName = "test"},
            new Album {ID = 2, AlbumName = "test2"},
            new Album {ID = 3, AlbumName = "test3"}
        };
        var userID = 1;

        // Stub the repository method(s) return value(s)
        repository.GetAllAlbums(userID).Returns(Task.FromResult(dummyList));
        // Set up the mapper to return specific values when Map is called
        mapper.Map<GetAlbumDTO>(Arg.Any<Album>()).Returns(callInfo =>
        {
            var album = callInfo.Arg<Album>();
            // Map the Album to GetAlbumDTO using the logic
            var albumDTO = new GetAlbumDTO { 
                User = new UserDTO{ Email = album.User?.Email ?? "" } 
            };
            return albumDTO;
        });

        // Act
        var result = await albumService.GetAllAlbums();

        // Assert
        Assert.True(result.Success);
        Assert.Equal(dummyList.Count, result.Data!.Count);
    }

    [Fact]
    public async void GetAllAlbums_NoAlbumsSaved_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });
        var userID = 1;

        // Stub the repository method(s) return value(s)
        repository.GetAllAlbums(userID).Returns(Task.FromResult<List<Album>?>(null));

        // Act
        var result = await albumService.GetAllAlbums();

        // Assert
        Assert.False(result.Success);
    }

    [Fact]
    public async void GetAlbumByID_ValidID_AlbumExists_ReturnsAlbum()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var dummyAlbum = new Album {ID = 1, AlbumName = "test", User = new User {}};
        var userID = 1;
        var encodedID = "ID";
        var decodedID = 123;
       
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedID).Returns(decodedID);
        repository.GetAlbumByUserAndAlbumID(userID, decodedID).Returns(Task.FromResult(dummyAlbum));
        // Set up the mapper to return specific values when Map is called
        mapper.Map<GetAlbumDTO>(Arg.Any<Album>()).Returns(callInfo =>
        {
            var album = callInfo.Arg<Album>();
            // Map the Album to GetAlbumDTO using the logic
            var albumDTO = new GetAlbumDTO { User = new UserDTO{} };
            return albumDTO;
        });

        // Act
        var result = await albumService.GetAlbumByID(encodedID);

        // Assert
        Assert.True(result.Success);
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async void GetAlbumByID_ValidID_AlbumNotExists_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var userID = 1;
        var encodedID = "ID";
        var decodedID = 123;
       
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedID).Returns(decodedID);
        repository.GetAlbumByUserAndAlbumID(userID, decodedID).Returns(Task.FromResult<Album?>(null));
       
        // Act
        var result = await albumService.GetAlbumByID(encodedID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Could not return that album", result.ReturnMessage);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void GetAlbumByID_InvalidID_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var encodedID = "ID";
       
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedID).Returns(-1);
       
        // Act
        var result = await albumService.GetAlbumByID(encodedID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Please pass the proper canonical ID..", result.ReturnMessage);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void GetAlbumsByUserID_ReturnsListOfAlbums()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });
        // Create dummy data
        var dummyList = new List<Album> {
            new Album {ID = 1, AlbumName = "test", User = new User {ID = 2}},
            new Album {ID = 2, AlbumName = "test2", User = new User {ID = 2}},
        };
        var currUserID = 1;
        var userWithAlbumsID = 2;

        // Stub the repository method(s) return value(s)
        repository.GetAlbumsByUserID(userWithAlbumsID, currUserID).Returns(Task.FromResult(dummyList));
        // Set up the mapper to return specific values when Map is called
        mapper.Map<GetAlbumDTO>(Arg.Any<Album>()).Returns(callInfo =>
        {
            var album = callInfo.Arg<Album>();
            // Map the Album to GetAlbumDTO using the logic
            var albumDTO = new GetAlbumDTO { 
                User = new UserDTO{ Email = album.User?.Email ?? "" } 
            };
            return albumDTO;
        });

        // Act
        var result = await albumService.GetAlbumsByUserID(userWithAlbumsID);

        // Assert
        Assert.True(result.Success);
        Assert.Equal(dummyList.Count, result.Data!.Count);
    }

    [Fact]
    public async void GetAlbumsByUserID_NoAlbumsFound_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });
        
        var currUserID = 1;
        var userWithAlbumsID = 2;

        // Stub the repository method(s) return value(s)
        repository.GetAlbumsByUserID(userWithAlbumsID, currUserID).Returns(Task.FromResult<List<Album>?>(null));
        
        // Act
        var result = await albumService.GetAlbumsByUserID(userWithAlbumsID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Could not get the albums.", result.ReturnMessage);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void AddAlbum_AlbumNotExists_ReturnsSuccess_ReturnsListOfAlbums()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });
        // Create dummy data
        var dummyDTO = new AddAlbumDTO { AlbumName = "test", SpotifyID = "spotifyID" };
        var dummyAlbum = new Album { AlbumName = "test"};
        var dummyAlbumsList = new List<Album> 
        { 
            new Album { AlbumName = "test2" }, 
            new Album { AlbumName = "test" } 
        };
        var dummyUser = new User { ID = 1 };
        var userID = 1;

        // Stub the repository method(s) return value(s)
        repository.GetAlbumUser(userID).Returns(Task.FromResult(dummyUser));
        repository.CheckAlbumExists(dummyDTO.SpotifyID, dummyAlbum).Returns(Task.FromResult<Album?>(null)); // not yet exists
        repository.AddAlbum(dummyAlbum).Returns(Task.CompletedTask);
        repository.SaveChanges().Returns(Task.CompletedTask);
        repository.ReturnNewAlbumListByUserID(userID).Returns(Task.FromResult(dummyAlbumsList));
        // Set up the mapper to return a specific value when Map is called
        mapper.Map<Album>(dummyDTO).Returns(dummyAlbum);

        // Act
        var result = await albumService.AddAlbum(dummyDTO);

        // Assert
        Assert.True(result.Success);
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async void AddAlbum_AlbumExists_ReturnsFalseSuccess_ReturnsNull()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });
        // Create dummy data
        var dummyDTO = new AddAlbumDTO { AlbumName = "test", SpotifyID = "spotifyID" };
        var dummyAlbum = new Album { AlbumName = "test"};
        var dummyUser = new User { ID = 1 };
        var userID = 1;

        // Stub the repository method(s) return value(s)
        repository.GetAlbumUser(userID).Returns(Task.FromResult(dummyUser));
        repository.CheckAlbumExists(dummyDTO.SpotifyID, dummyAlbum).Returns(Task.FromResult(dummyAlbum)); 
        // Set up the mapper to return a specific value when Map is called
        mapper.Map<Album>(dummyDTO).Returns(dummyAlbum);

        // Act
        var result = await albumService.AddAlbum(dummyDTO);

        // Assert
        Assert.False(result.Success);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void UpdateAlbum_ValidID_AlbumExists_ReturnsUpdatedAlbum()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

       // Create dummy data
        var dummyDTO = new UpdateAlbumDTO { ID = "123", AlbumDescription = "123" };
        var dummyAlbum = new Album { AlbumName = "test", User = new User { ID = 1 }};
        var decodedID = 123;
       
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(dummyDTO.ID).Returns(decodedID);
        repository.GetAlbumToUpdate(decodedID).Returns(Task.FromResult(dummyAlbum));
        repository.SaveChanges().Returns(Task.CompletedTask);
        mapper.Map<GetAlbumDTO>(dummyAlbum).Returns(new GetAlbumDTO());

        // Act
        var result = await albumService.UpdateAlbum(dummyDTO);

        // Assert
        Assert.True(result.Success);
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async void UpdateAlbum_ValidID_AlbumNotExists_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

       // Create dummy data
        var dummyDTO = new UpdateAlbumDTO { AlbumDescription = "123" };
        var encodedID = "ID";
        var decodedID = 123;
       
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedID).Returns(decodedID);
        repository.GetAlbumToUpdate(decodedID).Returns(Task.FromResult<Album?>(null));

        // Act
        var result = await albumService.UpdateAlbum(dummyDTO);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Album not found.", result.ReturnMessage);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void UpdateAlbum_InvalidID__ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var dummyDTO = new UpdateAlbumDTO { AlbumDescription = "123" };
        
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID("").Returns(-1);
      
        // Act
        var result = await albumService.UpdateAlbum(dummyDTO);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Please pass the proper canonical ID..", result.ReturnMessage);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void DeleteAlbum_ValidID_AlbumExists_ReturnsSuccess_ReturnsListOfAlbums()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var dummyList = new List<Album> {
            new Album {ID = 2, AlbumName = "test2", User = new User {ID = 1}},
            new Album {ID = 3, AlbumName = "test3", User = new User {ID = 1}},
        };
        var dummyAlbum = new Album { AlbumName = "test", User = new User { ID = 1 }};
        var userID = 1;
        var encodedAlbumID = "test";
        var decodedID = 1;
   
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(decodedID);
        repository.GetAlbumToRemove(decodedID, userID).Returns(Task.FromResult(dummyAlbum));
        repository.RemoveAlbum(dummyAlbum).Returns(Task.CompletedTask);
        repository.ReturnNewAlbumListByUserID(userID).Returns(Task.FromResult(dummyList));
        repository.SaveChanges().Returns(Task.CompletedTask);
        mapper.Map<GetAlbumDTO>(dummyAlbum).Returns(new GetAlbumDTO());

        // Act
        var result = await albumService.DeleteAlbum(encodedAlbumID);

        // Assert
        Assert.True(result.Success);
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async void DeleteAlbum_ValidID_AlbumNotExists_ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var userID = 1;
        var encodedAlbumID = "test";
        var decodedID = 1;
       
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(decodedID);
        repository.GetAlbumToRemove(decodedID, userID).Returns(Task.FromResult<Album?>(null));

        // Act
        var result = await albumService.DeleteAlbum(encodedAlbumID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Album not found.", result.ReturnMessage);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void DeleteAlbum_InvalidID__ReturnsNull_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var encodedAlbumID = "test";
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(-1);
      
        // Act
        var result = await albumService.DeleteAlbum(encodedAlbumID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Please pass the proper canonical ID..", result.ReturnMessage);
        Assert.Null(result.Data);
    }

    [Fact]
    public async void LikeAlbum_ValidID_AlbumExists_UserExists_LikesAlbum()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        // No like on album
        var dummyAlbum = new Album { ID = 1, AlbumName = "test" };
        var dummyUser = new User { ID = 1 };
        var dummyUserID = 1;
        var encodedAlbumID = "test";
        var decodedID = 1;
   
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(decodedID);
        repository.GetAlbumByAlbumIDIncludeLikes(decodedID).Returns(Task.FromResult(dummyAlbum));
        repository.GetAlbumUser(dummyUserID).Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await albumService.LikeAlbum(encodedAlbumID);

        // Assert
        Assert.True(result.Success);
        Assert.Equal("Album liked.", result.ReturnMessage);
    }

    [Fact]
    public async void LikeAlbum_ValidID_AlbumExists_UserExists_UnlikesAlbum()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        // Adds existing like on album
        var dummyAlbum = new Album { 
            ID = 1, 
            AlbumName = "test", 
            Likes = new List<AlbumLike> { 
                new AlbumLike { 
                    AlbumID = 1, 
                    UserID = 1
                }
            }
        };
        var dummyUser = new User { ID = 1 };
        var dummyUserID = 1;
        var encodedAlbumID = "test";
        var decodedID = 1;
   
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(decodedID);
        repository.GetAlbumByAlbumIDIncludeLikes(decodedID).Returns(Task.FromResult(dummyAlbum));
        repository.GetAlbumUser(dummyUserID).Returns(Task.FromResult(dummyUser));
        repository.SaveChanges().Returns(Task.CompletedTask);

        // Act
        var result = await albumService.LikeAlbum(encodedAlbumID);

        // Assert
        Assert.True(result.Success);
        Assert.Equal("Album un-liked.", result.ReturnMessage);
    }

    [Fact]
    public async void LikeAlbum_ValidID_AlbumExists_UserNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var dummyAlbum = new Album { ID = 1, AlbumName = "test" };
        var dummyUserID = 1;
        var encodedAlbumID = "test";
        var decodedID = 1;
   
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(decodedID);
        repository.GetAlbumByAlbumIDIncludeLikes(decodedID).Returns(Task.FromResult(dummyAlbum));
        repository.GetAlbumUser(dummyUserID).Returns(Task.FromResult<User?>(null));

        // Act
        var result = await albumService.LikeAlbum(encodedAlbumID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("There was an issue with the user.", result.ReturnMessage);
    }

    [Fact]
    public async void LikeAlbum_ValidID_AlbumNotExists_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

        // Create dummy data
        var dummyUser = new User { ID = 1 };
        var dummyUserID = 1;
        var encodedAlbumID = "test";
        var decodedID = 1;
   
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(decodedID);
        repository.GetAlbumUser(dummyUserID).Returns(Task.FromResult(dummyUser));
        repository.GetAlbumByAlbumIDIncludeLikes(decodedID).Returns(Task.FromResult<Album?>(null));

        // Act
        var result = await albumService.LikeAlbum(encodedAlbumID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("There was an issue with the record.", result.ReturnMessage);
    }

    [Fact]
    public async void LikeAlbum_InvalidID_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Mock the HTTPContextAccessor properties
        var userIdClaim = new Claim(ClaimTypes.NameIdentifier, "1");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { userIdClaim }, "mock"));
        // Stub the private GetUserID() method
        httpContextAccessor.HttpContext.Returns(new DefaultHttpContext
        {
            User = user
        });

         // Create dummy data
        var encodedAlbumID = "test";
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(-1);
   
        // Act
        var result = await albumService.LikeAlbum(encodedAlbumID);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Please pass the proper canonical ID..", result.ReturnMessage);
    }

    [Fact]
    public async void GetAllAlbumLikes_ValidID_ReturnsLikes()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Create dummy data
        var dummyLikes = new List<AlbumLike> {
            new AlbumLike { AlbumID = 1, UserID = 1 },
            new AlbumLike { AlbumID = 1, UserID = 2 }
        };
        var encodedAlbumID = "test";
        var decodedID = 1;
   
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(decodedID);
        repository.GetAllAlbumLikes(decodedID).Returns(Task.FromResult(dummyLikes));

        // Act
        var result = await albumService.GetAllAlbumLikes(encodedAlbumID);

        // Assert
        Assert.True(result.Success);
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async void GetAllAlbumLikes_InvalidID_ReturnsFalseSuccess()
    {
        // Arrange
        // Create repository subsitute and new service instance
        var repository = Substitute.For<IAlbumRepository>();
        var mapper = Substitute.For<IMapper>();
        var httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var albumService = new AlbumService(mapper, repository, httpContextAccessor);

        // Create dummy data
        var encodedAlbumID = "test";
   
        // Stub the repository method(s) return value(s)
        repository.CheckSqidsID(encodedAlbumID).Returns(-1);

        // Act
        var result = await albumService.GetAllAlbumLikes(encodedAlbumID);

        // Assert
        Assert.False(result.Success);
    }
}
