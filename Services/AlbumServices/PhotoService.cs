using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace AlbumAPI.Services.AlbumServices
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary; 

        //Inject Cloudinary configuration
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            //Create an account with the required Cloudinary environment credentials
            var acc = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        //Method to add a passed file
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            //Check if file actually exists
            if (file.Length > 0) {
                //Access file stream to upload to cloud
                using var stream = file.OpenReadStream();

                //Specify file name, applied transformation, and save location
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500),
                    Folder = "album-api"
                };

                //Perform async upload to Cloudinary 
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }
        
        //Method to delete an existing file based on passed ID
        public async Task<DeletionResult> DeletePhotoASync(string publicID)
        {
            //Specify public ID of file to be deleted
            var deleteParams = new DeletionParams(publicID);

            //Perform async deletion in Cloudinary.
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}