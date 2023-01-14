
/// <summary>
/// Album services method declarations
/// </summary>
namespace AlbumAPI.Services.AlbumServices
{
    public interface IAlbumService
    {
        //Method to return the list of all albums
        Task<ServiceResponse<List<GetAlbumDTO>>> GetAllAlbums();
        //Method to return the specified album as per ID
        Task<ServiceResponse<GetAlbumDTO>> GetAlbumByID(int ID);
        //Method to add album based on passed new model
        Task<ServiceResponse<List<GetAlbumDTO>>> AddAlbum(AddAlbumDTO newAlbum, ImageUploadResult result);
        //Method to update album based on passed model
        Task<ServiceResponse<GetAlbumDTO>> UpdateAlbum(UpdateAlbumDTO updateAlbum);
        //Method to delete album as per passed ID
        Task<ServiceResponse<List<GetAlbumDTO>>> DeleteAlbum(int ID);
    }
}