/// <summary>
/// Configures settings for linking Cloudinary account for photo upload
/// </summary>
namespace AlbumAPI
{
    public class CloudinarySettings
    {
        //Cloudinary Account Cloud name 
        public string CloudName { get; set; } = string.Empty;
        
        //Cloudinary Account API key  
        public string ApiKey{ get; set; } = string.Empty; 

        //Cloudinary Account API password  
        public string ApiSecret { get; set; } = string.Empty;
    }
}