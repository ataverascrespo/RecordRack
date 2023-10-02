using System.Security.Claims;
using AlbumAPI.DTOs.Profile;
using Sqids;
/// <summary>
/// Implementation of dependency injection
/// Service class handles data retrieval from the database
/// Forwards the results to the controller
/// 
/// Also contains SqidsIDResolver class
/// </summary>
namespace AlbumAPI.Services.AlbumServices
{
    public class AlbumService : IAlbumService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly SqidsEncoder<int> _sqids;

        //AutoMapper Constructor
        //Inject data context for DB access
        //Inject HTTP context accessor
        public AlbumService(IMapper mapper, DataContext context, IHttpContextAccessor httpContextAccessor, SqidsEncoder<int> sqids)
        {
            _mapper = mapper;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _sqids = sqids;
        }

        //Return User ID
        private int GetUserID() => int.Parse(_httpContextAccessor.HttpContext!.User
            .FindFirstValue(ClaimTypes.NameIdentifier)!);

        //Method to get albums
        public async Task<ServiceResponse<List<GetAlbumDTO>>> GetAllAlbums()
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();
            
            //Access database albums table where User ID is valid
            var dbAlbums = await _context.Albums
                .Where(a => a.User!.ID == GetUserID())
                .OrderBy(a => a.DateAdded)
                .Include(album => album.User)
                .ToListAsync();
                    
            //Map all Album models to GetAlbumDTO w/ AutoMapper
            serviceResponse.Data = dbAlbums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToList();
            return serviceResponse;
        }

        //Method to return the specified album as per ID
        public async Task<ServiceResponse<GetAlbumDTO>> GetAlbumByID(string ID)
        {
            //Create wrapper model for album DTO 
            var serviceResponse = new ServiceResponse<GetAlbumDTO>();

            //Check if the passed ID is "canonical" before using its decoded value by re-encoding the decoded number and checking if the result matches the incoming ID. As described in https://github.com/sqids/sqids-dotnet#ensuring-an-id-is-canonical
            if (_sqids.Decode(ID) is [var decodedID] && ID == _sqids.Encode(decodedID))
            {
                //Access database albums table where album and users ID are valid
                var dbAlbum = await _context.Albums.Include(album => album.User)
                                .FirstOrDefaultAsync(a => a.ID == decodedID && (!a.isPrivate || a.User.ID == GetUserID()));
                if (dbAlbum == null) 
                {
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = "Could not return that album";
                }
                
                //Add list of albums to wrapper object and return
                //The previous null check in this method can be removed as the wrapper object's properties are nullable
                //Map returned Album model to GetAlbumDTO w/ AutoMapper
                serviceResponse.Data = _mapper.Map<GetAlbumDTO>(dbAlbum);
            }
            else 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Please pass the proper canonical ID..";
            }

            return serviceResponse;
        }

         //Method to return the list of albums for a specified user ID
        public async Task<ServiceResponse<List<GetAlbumDTO>>> GetAlbumsByUserID(int UserID)
        {
            //Create wrapper model for album DTO 
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();
            
            //Access database albums table where album and users ID are valid
            //Remove albums where isPrivate is = true. 
            var dbAlbums = await _context.Albums
                .Where(a => (a.User!.ID == UserID && !a.isPrivate) || (UserID == GetUserID() && a.User!.ID == UserID))
                .OrderBy(a => a.DateAdded)
                .Include(album => album.User)
                .ToListAsync();
            
            //Add list of albums to wrapper object and return
            //The previous null check in this method can be removed as the wrapper object's properties are nullable
             //Map all Album models to GetAlbumDTO w/ AutoMapper
            serviceResponse.Data = dbAlbums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToList();
            return serviceResponse;
        }

        //Method to return add an albums
        public async Task<ServiceResponse<List<GetAlbumDTO>>> AddAlbum(AddAlbumDTO newAlbum)
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();

            //Map AddAlbumDTO to Album Model w/ AutoMapper
            var album = _mapper.Map<Album>(newAlbum);
            album.User = await _context.Users.FirstOrDefaultAsync(u => u.ID == GetUserID());

            // Search the DB to see if there is an instance of the album where it's Spotify ID already is stored for a given user
            var albumExists = await _context.Albums.FirstOrDefaultAsync(a => a.SpotifyID.Equals(newAlbum.SpotifyID) && a.User!.ID == album.User!.ID);
            if (albumExists != null) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "That record already exists in your racklist.";
            }
            else 
            {
                //Add album to the DB albums table and auto generate a new ID
                _context.Albums.Add(album);

                //Save changes to DB album table
                await _context.SaveChangesAsync();

                //Map current Album model to GetAlbumDTO w/ AutoMapper
                //Add albums list to wrapper and return 
                serviceResponse.Data = await _context.Albums.Where(
                a => a.User!.ID == GetUserID()).Select(a => _mapper.Map<GetAlbumDTO>(a)).ToListAsync();
            }
            return serviceResponse;
        }

        // Method to return updated album fields (literally just the description and privacy settings)
        public async Task<ServiceResponse<GetAlbumDTO>> UpdateAlbum(UpdateAlbumDTO updateAlbum)
        {
            //Create wrapper model for album DTO
            var serviceResponse = new ServiceResponse<GetAlbumDTO>();

            //Check if the passed ID is "canonical" before using its decoded value by re-encoding the decoded number and checking if the result matches the incoming ID. As described in https://github.com/sqids/sqids-dotnet#ensuring-an-id-is-canonical
            if (_sqids.Decode(updateAlbum.ID) is [var decodedID] && updateAlbum.ID == _sqids.Encode(decodedID))
            {
                try
                {
                    //Find first or default album in DB albums table where the ID of the passed album is equal 
                    var album = await _context.Albums.Include(a => a.User).FirstOrDefaultAsync(a => a.ID == decodedID);               
                    if (album == null || album.User!.ID != GetUserID())
                    {
                        throw new Exception($"Album with ID '{updateAlbum.ID}' not found");
                    }

                    album.AlbumDescription = updateAlbum.AlbumDescription;
                    album.isPrivate = updateAlbum.isPrivate;

                    //Save changes to database Album table
                    await _context.SaveChangesAsync();

                    //Map Album model to GetAlbumDTO w/ AutoMapper
                    //Add albums list to wrapper and return 
                    serviceResponse.Data = _mapper.Map<GetAlbumDTO>(album);
                } 
                catch (Exception ex) 
                {
                    //If album does not exist
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = ex.Message;
                }
            }
            //If ID is not canonical
            else 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Please pass the proper canonical ID..";
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAlbumDTO>>> DeleteAlbum(string ID)
        {
            //Create wrapper model for album DTO
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();

            //Check if the passed ID is "canonical" before using its decoded value by re-encoding the decoded number and checking if the result matches the incoming ID. As described in https://github.com/sqids/sqids-dotnet#ensuring-an-id-is-canonical
            if (_sqids.Decode(ID) is [var decodedID] && ID == _sqids.Encode(decodedID))
            {
                try
                {
                    //Find first album where the ID of the passed album and user are equal 
                    var album = await _context.Albums.FirstOrDefaultAsync(a => a.ID == decodedID && a.User!.ID == GetUserID());
                    if (album == null)
                    {
                        throw new Exception($"Album with ID '{ID}' not found");
                    }
                    //Remove selected album from database
                    _context.Albums.Remove(album);

                    //Save changes to DB album table
                    await _context.SaveChangesAsync();

                    //Map all Album models to GetAlbumDTO w/ AutoMapper
                    serviceResponse.Data = await _context.Albums.Where(a => a.User!.ID == GetUserID()).Select(a => _mapper.Map<GetAlbumDTO>(a)).ToListAsync();
                }
                catch (Exception ex)
                {
                    //If album does not exist
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = ex.Message;
                }
            }
            //If ID is not canonical
            else 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Please pass the proper canonical ID..";
            }

            return serviceResponse;
        }

         //Method to return add an albums
        public async Task<ServiceResponse<string>> LikeAlbum(string ID)
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<string>();

            //Check if the passed ID is "canonical" before using its decoded value by re-encoding the decoded number and checking if the result matches the incoming ID. As described in https://github.com/sqids/sqids-dotnet#ensuring-an-id-is-canonical
            if (_sqids.Decode(ID) is [var decodedID] && ID == _sqids.Encode(decodedID))
            {

                //Find first or default album in DB albums table where the ID of the passed album is equal 
                var album = await _context.Albums.Include(a => a.Likes).FirstOrDefaultAsync(a => a.ID == decodedID);
                //Find first or default user in DB users table
                var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == GetUserID());

                if (album == null || user == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = "There was an issue with the record or user.";
                }
                else
                {
                    var like = album!.Likes.FirstOrDefault(l => l.UserID == user!.ID);
                    if (like != null)
                    {
                        //If the user has already liked this album, remove the like
                        album.Likes.Remove(like);
                        serviceResponse.Success = true;
                        serviceResponse.ReturnMessage = "Album un-liked.";
                    }
                    else
                    {
                        //Create a new AlbumLike model with album and user information
                        like = new AlbumLike
                        {
                            User = user,
                            Album = album,
                        };

                        //Add the like to the list of album likes
                        album.Likes.Add(like);

                        //If album does not exist
                        serviceResponse.Success = true;
                        serviceResponse.ReturnMessage = "Album liked.";
                    }
                }
                 //Save the changes in DB 
                await _context.SaveChangesAsync();
            }
            //If ID is not canonical
            else 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Please pass the proper canonical ID..";
            }

            return serviceResponse;
        }

        //Method to get likes for albums
        public async Task<ServiceResponse<List<AlbumLikesDTO>>> GetAllAlbumLikes(string ID)
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<List<AlbumLikesDTO>>();

            //Check if the passed ID is "canonical" before using its decoded value by re-encoding the decoded number and checking if the result matches the incoming ID. As described in https://github.com/sqids/sqids-dotnet#ensuring-an-id-is-canonical
            if (_sqids.Decode(ID) is [var decodedID] && ID == _sqids.Encode(decodedID))
            {
                //Access database albums table where User ID is valid
                var likes = await _context.AlbumLikes.Where(a => a.AlbumID == decodedID).Include(likes => likes.User).ToListAsync();
                //Map all Album models to GetAlbumDTO w/ AutoMapper
                serviceResponse.Data = likes.Select(a => _mapper.Map<AlbumLikesDTO>(a)).ToList();
            }
            //If ID is not canonical
            else 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Please pass the proper canonical ID..";
            }

            return serviceResponse;
        }
    }

    public class SqidsIDResolver : IValueResolver<Album, GetAlbumDTO, string>
    {

        private readonly SqidsEncoder<int> _sqids;

        public SqidsIDResolver(SqidsEncoder<int> sqids)
        {
            _sqids = sqids;
        }

        public string Resolve(Album source, GetAlbumDTO destination, string destMember, ResolutionContext context)
        {
            // Use your custom package to convert the AlbumID (int) to a unique string
            int albumID = source.ID;
            string encodedAlbumId = _sqids.Encode(albumID);

            return encodedAlbumId;
        }
    }
}