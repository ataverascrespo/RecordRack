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
    }
}