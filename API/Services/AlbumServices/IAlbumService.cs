
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

        //Method to return the list of all albums for a specified user ID
        Task<ServiceResponse<List<GetAlbumDTO>>> GetAlbumsByUserID(int UserID);
        
        //Method to add album based on passed new model
        Task<ServiceResponse<List<GetAlbumDTO>>> AddAlbum(AddAlbumDTO newAlbum);

        //Method to update album based on passed model
        Task<ServiceResponse<GetAlbumDTO>> UpdateAlbum(UpdateAlbumDTO updateAlbum);

        //Method to delete album as per passed ID
        Task<ServiceResponse<List<GetAlbumDTO>>> DeleteAlbum(int ID);

        //Method to like an album as per passed ID
        Task<ServiceResponse<string>> LikeAlbum(int ID);

        //Method to return all likes for an album
        Task<ServiceResponse<List<AlbumLikesDTO>>> GetAllAlbumLikes(int ID);
    }
}