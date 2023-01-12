/// <summary>
/// Photo services method declarations
/// </summary>

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace AlbumAPI.Services.AlbumServices
{
    public interface IPhotoService
    {
        Cloudinary GetCloudinaryAccount();
        //Method to add a passed file
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        //Method to delete an existing file based on passed ID
        Task<DeletionResult> DeletePhotoASync(string publicID);
    }
}