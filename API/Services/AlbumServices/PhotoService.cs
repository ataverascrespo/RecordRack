using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace AlbumAPI.Services.AlbumServices
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
            var cloudName = _configuration["/recordrack/cloudinarycloudname"];
            var apiKey = _configuration["/recordrack/cloudinaryAPIKey"];
            var apiSecret = _configuration["/recordrack/cloudinarysecretkey"];

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
            Cloudinary _cloudinary = GetCloudinaryAccount();

            //Specify public ID of file to be deleted
            var deleteParams = new DeletionParams(publicID);

            //Perform async deletion in Cloudinary.
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}