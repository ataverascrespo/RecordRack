using System.Security.Claims;
using AlbumAPI.DTOs.Profile;
using Sqids;
/// <summary>
/// Implementation of dependency injection
/// Service class handles data retrieval from the database
/// Forwards the results to the controller
/// </summary>
namespace AlbumAPI.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        //AutoMapper Constructor
        //Inject data context repository wrapper for DB access
        //Inject HTTP context accessor
        public UserService(IMapper mapper, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        //Return User ID
        private int GetUserID() => int.Parse(_httpContextAccessor.HttpContext!.User
            .FindFirstValue(ClaimTypes.NameIdentifier)!);

        public async Task<ServiceResponse<List<UserDTO>>> GetUsers()
        {

            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            //Get all the users in the database
            var users = await _userRepository.GetUsers();
            
            // Map all User models to UserDTOs w/ AutoMapper
            serviceResponse.Data = users.Select(u =>
            {
                var userDto = _mapper.Map<UserDTO>(u);
                userDto.FollowersCount = u.Followers.Count;
                userDto.FollowingCount = u.Followings.Count;
                userDto.Following = u.Followers.Any(f => f.Follower!.ID == GetUserID());

                return userDto;
            }).ToList();

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<UserDTO>>> GetUsersSearch(string searchQuery)
        {

            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            //Get all the users in the database
            var users = await _userRepository.GetUsers();

            // Filter the users in-memory based on the search query
            users = users
                .Where(u => u.UserName.IndexOf(searchQuery, StringComparison.OrdinalIgnoreCase) >= 0)
                .ToList();

            //Return error if no users found
            if (users == null || users.Count == 0) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "No users exist with those search terms.";
                return serviceResponse;
            }
            
            // Map all User models to UserDTOs w/ AutoMapper
            serviceResponse.Data = users.Select(u =>
            {
                var userDto = _mapper.Map<UserDTO>(u);
                userDto.FollowersCount = u.Followers.Count;
                userDto.FollowingCount = u.Followings.Count;
                //Remove the email prop - not necessary to return here
                userDto.Email = "";
                return userDto;
            }).ToList();

            return serviceResponse;
        }
        
        public async Task<ServiceResponse<UserDTO>> GetUserByName(string userName)
        {
            var serviceResponse = new ServiceResponse<UserDTO>();

            //Get all the users in the database
            var user = await _userRepository.GetUserByName(userName);

            if (user == null)
            {
                serviceResponse.Success = false;
                //Error message
                serviceResponse.ReturnMessage = "That user does not exist.";
            }
            else {
                var searchedUser = _mapper.Map<UserDTO>(user);
                searchedUser.FollowersCount = user.Followers.Count;
                searchedUser.FollowingCount = user.Followings.Count;
                searchedUser.Following = await _userRepository.GetUserFollowing(GetUserID(), user.ID);
                
                //Remove the email prop - not necessary to return here
                searchedUser.Email = "";
                //Store DTO in service data
                serviceResponse.Data = searchedUser;
            }
            return serviceResponse;
        }

        //Method to retrieve the current signed in user
        public async Task<ServiceResponse<UserDTO>> GetCurrentUser() 
        {

            var serviceResponse = new ServiceResponse<UserDTO>();

            // Retrieve the current user
            var user = await _userRepository.GetCurrentUser(GetUserID());
          
            if (user == null)
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "There is no current user signed in.";
            }
            else {
                UserDTO currentUser = CreateUserDTO(user);
                
                //Store DTO in service data
                serviceResponse.Data = currentUser;
            }
            
            return serviceResponse;
        }

        //Method to retrieve the current signed in user
        public async Task<ServiceResponse<UserDTO>> AddProfilePhoto(ImageUploadResult result) 
        {

            var serviceResponse = new ServiceResponse<UserDTO>();

            // Retrieve the current user
            var user = await _userRepository.GetCurrentUser(GetUserID());

            if (user == null)
            {
                serviceResponse.Success = false;
                //Error message
                serviceResponse.ReturnMessage = "There is no current user signed in.";
            }
            else {

                user.ImageURL = result.SecureUrl.AbsoluteUri;
                user.ImageID = result.PublicId;

                UserDTO currentUser = CreateUserDTO(user);
                //Store DTO in service data
                serviceResponse.Data = currentUser;

                // Save DB changes
                await _userRepository.SaveChanges();
            }
            
            return serviceResponse;
        }

         //Method to follow a user
        public async Task<ServiceResponse<UserDTO>> FollowUser(int targetID) 
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<UserDTO>();

            // Call repo methods to get follower and target
            var follower = await _userRepository.FollowUserGetFollower(GetUserID());
            var target = await _userRepository.FollowUserGetTarget(targetID);

            if (target == null || follower == null) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Could not follow that user.";
            }
            else 
            {
                var following = await _userRepository.FindFollowing(follower.ID, target.ID);

                //If the user does not already follow target
                if (following == null) 
                {
                    var newFollow = new UserFollowing
                    {
                        Follower = follower,
                        Target = target,
                        FollowerName = follower.UserName,
                        TimeFollowed = DateTime.UtcNow,
                    };

                     // Add the new following and save
                    await _userRepository.AddFollowing(newFollow);
                    await _userRepository.SaveChanges();
                    
                    //If following does not exist
                    //Map UserDTO to return
                    UserDTO user = CreateUserDTO(target);
                    user.FollowersCount = await _userRepository.GetUserFollowersCount(user.ID);
                    user.FollowingCount = await _userRepository.GetUserFollowingCount(user.ID);
                    user.Following = await _userRepository.GetUserFollowing(GetUserID(), user.ID);
                    //Remove the email prop - not necessary to return here
                    user.Email = "";

                    serviceResponse.Data = user;
                    serviceResponse.Success = true;
                    serviceResponse.ReturnMessage = "Followed user.";
                }
                //If the user does already follow target
                else 
                {
                    // Add the new following and save
                    await _userRepository.RemoveFollowing(following);

                    //If following does not exist
                    //Map UserDTO to return
                    UserDTO user = CreateUserDTO(target);
                    user.FollowersCount = await _userRepository.GetUserFollowersCount(user.ID);
                    user.FollowingCount = await _userRepository.GetUserFollowingCount(user.ID);
                    user.Following = await _userRepository.GetUserFollowing(GetUserID(), user.ID);
                    //Remove the email prop - not necessary to return here
                    user.Email = "";
                    
                    serviceResponse.Data = user;
                    serviceResponse.Success = true;
                    serviceResponse.ReturnMessage = "Unfollowed user.";
                }
            }

            //Save the changes in DB and return the service response
            return serviceResponse;
        }

        //Method to return a list of followers for a given user
        public async Task<ServiceResponse<List<UserDTO>>> GetFollowers(int targetID)
        {
            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            // Retrieve the user by userId with their Followers collection loaded
            var user = await _userRepository.GetUserByIDWithFollowers(targetID);

            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "User not found.";
                return serviceResponse;
            }

            // Map the Followers collection to UserDTOs
            var followers = await _userRepository.GetFollowers(targetID, GetUserID());
            serviceResponse.Data = followers;

            return serviceResponse;
        }

        //Method to return a list of followed users for a given user
        public async Task<ServiceResponse<List<UserDTO>>> GetFollowing(int followerID)
        {
            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            // Retrieve the user by userId with their Followers collection loaded
            var user = await _userRepository.GetUserByIDWithFollowers(followerID);

            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "User not found.";
                return serviceResponse;
            }

            // Map the Followers collection to UserDTOs
            var following = await _userRepository.GetFollowings(followerID, GetUserID());
            serviceResponse.Data = following;

            return serviceResponse;
        }

        // Method to return all notifications for a user
        public async Task<ServiceResponse<List<NotificationDTO>>> GetNotifications()
        {
            var serviceResponse = new ServiceResponse<List<NotificationDTO>>();

            // Retrieve the followings and album likes for a given user
            var userFollowings = await _userRepository.GetUserFollowingsForTarget(GetUserID());
            var albumLikes = await _userRepository.GetAlbumLikesForUser(GetUserID());

            if (userFollowings == null && albumLikes == null)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Could not find any notifications.";
                return serviceResponse;
            }
            else if (userFollowings == null) 
            {
                userFollowings = new List<UserFollowing>();
            }
            else if (albumLikes == null) 
            {
                albumLikes = new List<AlbumLike>();
            }
             
            // this selects OTHER users who have triggered notifications on YOUR account + what triggered the notificatiion
            // this is a very interesting linq query! AutoMapperProfile.cs creates these maps
            /*
                CreateMap<UserFollowing, NotificationDTO>()
                    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "UserFollowing"))
                    .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.FollowerName))
                    .ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.TimeFollowed));
                CreateMap<AlbumLike, NotificationDTO>()
                    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "AlbumLike"))
                    .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                    .ForMember(dest => dest.Time, opt => opt.MapFrom(src => src.TimeLiked))
                    .ForMember(dest => dest.AlbumID, opt => opt.MapFrom<SqidsLikeIDResolver>());
            */
            // so if the UserFollowing is being mapped to notificationDTO, it sets the DTO fields (type, time, etc.) accordingly
            // same thing for if the Albumlike is being mapped
            // and eventually it just returns an entire unique list of both types
            var notifications = userFollowings!
                .Select(uf => 
                {
                    var notiDTO = _mapper.Map<NotificationDTO>(uf);
                    // Set the user to the mapped follower
                    notiDTO.User = _mapper.Map<UserDTO>(uf.Follower);
                    // Don't send back user email
                    notiDTO.User.Email = "";
                    return notiDTO;
                })
                .Union(
                    albumLikes
                        .Select(al => 
                        {
                            var notiDTO = _mapper.Map<NotificationDTO>(al);
                            notiDTO.Album = _mapper.Map<GetAlbumDTO>(al.Album);
                            // Don't send back user email
                            if (notiDTO.User != null)
                            {
                                notiDTO.User.Email = "";
                            }
                            return notiDTO;
                        })
                )
                .OrderByDescending(n => n.Time)
                .ToList();

            serviceResponse.Data = notifications;
            return serviceResponse;    
        }

        //Method to create a UserDTO to return upon login
        private UserDTO CreateUserDTO(User user)
        {
            return new UserDTO
            {
                ID = user.ID,
                Email = user.Email,
                UserName = user.UserName,
                Token = "",
                ImageURL = user.ImageURL,
                ImageID = user.ImageID,
                Following = false,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count
            };
        }
    }
}
