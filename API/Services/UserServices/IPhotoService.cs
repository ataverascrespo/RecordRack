/// <summary>
/// Photo services method declarations
/// </summary>

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace AlbumAPI.Services.UserServices
{
    public interface IPhotoService
    {
        //Method to get cloudinary account
        Cloudinary GetCloudinaryAccount();
        //Method to add a passed file
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        //Method to delete an existing file based on passed ID
        Task<DeletionResult> DeletePhotoAsync(string publicID);
    }
}