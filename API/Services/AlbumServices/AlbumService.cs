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
        private readonly IAlbumRepository _albumRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        //AutoMapper Constructor
        //Inject data context for DB access
        //Inject HTTP context accessor
        public AlbumService(IMapper mapper, IAlbumRepository albumRepository, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _albumRepository = albumRepository;
            _httpContextAccessor = httpContextAccessor;
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
            var dbAlbums = await _albumRepository.GetAllAlbums(GetUserID());

            if (dbAlbums == null) 
            {
                serviceResponse.Success = false;
                return serviceResponse;
            }
                    
            //Map all Album models to GetAlbumDTO w/ AutoMapper
            serviceResponse.Data = dbAlbums.Select(a =>  
            {
                var albumDTO = _mapper.Map<GetAlbumDTO>(a);
                albumDTO.User!.Email = "";
                return albumDTO;
            }).ToList();
            return serviceResponse;
        }

        //Method to return the specified album as per ID
        public async Task<ServiceResponse<GetAlbumDTO>> GetAlbumByID(string ID)
        {
            //Create wrapper model for album DTO 
            var serviceResponse = new ServiceResponse<GetAlbumDTO>();

            //Check if the passed ID is "canonical" before using its decoded value by re-encoding the decoded number and checking if the result matches the incoming ID. As described in https://github.com/sqids/sqids-dotnet#ensuring-an-id-is-canonical
            var decodedID = _albumRepository.CheckSqidsID(ID);
            if (decodedID != -1)
            {
                //Access database albums table where album and users ID are valid
                var dbAlbum = await _albumRepository.GetAlbumByUserAndAlbumID(GetUserID(), decodedID);
                
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
            var dbAlbums = await _albumRepository.GetAlbumsByUserID(UserID, GetUserID());

            if (dbAlbums == null) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Could not get the albums.";
                return serviceResponse;
            }
            
            //Add list of albums to wrapper object and return
            //The previous null check in this method can be removed as the wrapper object's properties are nullable
            //Map all Album models to GetAlbumDTO w/ AutoMapper
            serviceResponse.Data = dbAlbums.Select(a =>  
            {
                var albumDTO = _mapper.Map<GetAlbumDTO>(a);
                albumDTO.User!.Email = "";
                return albumDTO;
            }).ToList();

            return serviceResponse;
        }

        //Method to return add an albums
        public async Task<ServiceResponse<List<GetAlbumDTO>>> AddAlbum(AddAlbumDTO newAlbum)
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();

            //Map AddAlbumDTO to Album Model w/ AutoMapper
            var album = _mapper.Map<Album>(newAlbum);
            album.User = await _albumRepository.GetAlbumUser(GetUserID());

            // Search the DB to see if there is an instance of the album where it's Spotify ID already is stored for a given user
            var albumExists = await _albumRepository.CheckAlbumExists(newAlbum.SpotifyID, album);

            if (albumExists != null) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "That record already exists in your racklist.";
            }
            else 
            {
                //Add album to the DB albums table and auto generate a new ID
                await _albumRepository.AddAlbum(album);

                //Save changes to DB album table
                await _albumRepository.SaveChanges();

                //Map current Album model to GetAlbumDTO w/ AutoMapper
                //Add albums list to wrapper and return 

                var albums = await _albumRepository.ReturnNewAlbumListByUserID(GetUserID());

                serviceResponse.Data = albums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToList();
            }
            return serviceResponse;
        }

        // Method to return updated album fields (literally just the description and privacy settings)
        public async Task<ServiceResponse<GetAlbumDTO>> UpdateAlbum(UpdateAlbumDTO updateAlbum)
        {
            //Create wrapper model for album DTO
            var serviceResponse = new ServiceResponse<GetAlbumDTO>();

            //Check if the passed ID is "canonical" before using its decoded value by re-encoding the decoded number and checking if the result matches the incoming ID. As described in https://github.com/sqids/sqids-dotnet#ensuring-an-id-is-canonical
            var decodedID = _albumRepository.CheckSqidsID(updateAlbum.ID);
            if (decodedID != -1)
            {
                //Find first or default album in DB albums table where the ID of the passed album is equal 
                var album = await _albumRepository.GetAlbumToUpdate(decodedID);

                if (album == null || album.User!.ID != GetUserID())
                {
                    //If album does not exist
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = "Album not found.";
                    return serviceResponse;
                }

                album.AlbumDescription = updateAlbum.AlbumDescription;
                album.isPrivate = updateAlbum.isPrivate;

                //Save changes to database Album table
                await _albumRepository.SaveChanges();

                //Map Album model to GetAlbumDTO w/ AutoMapper
                //Add albums list to wrapper and return 
                serviceResponse.Data = _mapper.Map<GetAlbumDTO>(album);
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
            var decodedID = _albumRepository.CheckSqidsID(ID);
            if (decodedID != -1)
            {
                //Find first album where the ID of the passed album and user are equal 
                var album = await _albumRepository.GetAlbumToRemove(decodedID, GetUserID());

                if (album == null)
                {
                    //If album does not exist
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = "Album not found.";
                    return serviceResponse;
                }

                await _albumRepository.RemoveAlbum(album);

                //Map all Album models to GetAlbumDTO w/ AutoMapper
                var albums = await _albumRepository.ReturnNewAlbumListByUserID(GetUserID());

                serviceResponse.Data = albums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToList();
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
            var decodedID = _albumRepository.CheckSqidsID(ID);
            if (decodedID != -1)
            {

                //Find first or default album in DB albums table where the ID of the passed album is equal 
                var album = await _albumRepository.GetAlbumByAlbumIDIncludeLikes(decodedID);
                
                //Find first or default user in DB users table
                var user = await _albumRepository.GetAlbumUser(GetUserID());

                if (album == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = "There was an issue with the record.";
                }
                else if (user == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.ReturnMessage = "There was an issue with the user.";
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
                await _albumRepository.SaveChanges();
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
            var decodedID = _albumRepository.CheckSqidsID(ID);
            if (decodedID != -1)
            {
                //Access database albums table where User ID is valid
                var likes = await _albumRepository.GetAllAlbumLikes(decodedID);
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