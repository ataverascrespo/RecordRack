using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace AlbumAPI.Services.UserServices
{
    public class PhotoService : IPhotoService
    {
        private readonly IConfiguration _configuration;

        //Inject Cloudinary configuration
        public PhotoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Cloudinary GetCloudinaryAccount()
        {
            //Get all the cloudinary settings from configuration environment variables
            var cloudName = _configuration.GetSection("CloudinarySettings:CloudName").Value;
            var apiKey = _configuration.GetSection("CloudinarySettings:ApiKey").Value;
            var apiSecret = _configuration.GetSection("CloudinarySettings:ApiSecret").Value;

            var acc = new Account
            {
                Cloud = cloudName,
                ApiKey = apiKey,
                ApiSecret = apiSecret
            };
         
            Cloudinary _cloudinary = new Cloudinary(acc);

            return _cloudinary;
        }

        //Method to add a passed file
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            Cloudinary _cloudinary = GetCloudinaryAccount();

            var uploadResult = new ImageUploadResult();

            //Check if file actually exists
            if (file.Length > 0) {
                //Access file stream to upload to cloud
                using var stream = file.OpenReadStream();

                //Specify file name, applied transformation, and save location
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(360).Width(360).Crop("fill"),
                    Folder = "album-api"
                };

                //Perform async upload to Cloudinary 
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        //Method to delete an existing file based on passed ID
        public async Task<DeletionResult> DeletePhotoAsync(string publicID)
        {
            Cloudinary _cloudinary = GetCloudinaryAccount();

            //Specify public ID of file to be deleted
            var deleteParams = new DeletionParams(publicID);

            //Perform async deletion in Cloudinary.
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}