using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlbumAPI.Services.UserServices
{
    public interface IUserService
    {
       //Method to get all users
        Task<ServiceResponse<List<UserDTO>>> GetUsers();

        //Method to get current user by passed ID
        Task<ServiceResponse<UserDTO>> GetUserByName(string userName);

        //Method to get current user
        Task<ServiceResponse<UserDTO>> GetCurrentUser();

        //Method to add a profile picture
        Task<ServiceResponse<UserDTO>> AddProfilePhoto(ImageUploadResult result);

         //Method to follow a user
        Task<ServiceResponse<UserDTO>> FollowUser(int TargetID);

        //Method to return a list of followers for a given user
        Task<ServiceResponse<List<UserDTO>>> GetFollowers(int UserID);

        //Method to return a list of followed users for a given user
        Task<ServiceResponse<List<UserDTO>>> GetFollowing(int UserID);
    }
}