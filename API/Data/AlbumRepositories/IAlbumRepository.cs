/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IAlbumRepository
    {

        //General method to save DB changes
        Task SaveChanges(); 

        // Method to get all albums
        Task<List<Album>> GetAllAlbums(int userID);

        // Method to get album by specified user ID and album ID
        Task<Album> GetAlbumByUserAndAlbumID(int userID, int albumID);

        // Method to get list of albums associated with UserID
        Task<List<Album>> GetAlbumsByUserID(int userID, int currentUserID);

        // Method to get the associated user of an album
        Task<User> GetAlbumUser(int userID);

        // Method to check if the specified album has already been added
        Task<Album> CheckAlbumExists(string spotifyID, Album album);

        // Method to save album in DB
        Task AddAlbum(Album album);

        // Post addition method to return albums for the current user
        Task<List<Album>> ReturnNewAlbumListByUserID(int userID);

        // Method that returns the album that is requesting to be updated
        Task<Album> GetAlbumToUpdate(int albumID);

        // Method that returns the album that is being deleted
        Task<Album> GetAlbumToRemove(int albumID, int userID);

        // Method to remove the album from the database
        Task RemoveAlbum(Album album);

        // Method to get an album by its ID, with the corresponding likes included in the query
        Task<Album> GetAlbumByAlbumIDIncludeLikes(int albumID);

        // Method to get all the likes for a user
        Task<List<AlbumLike>> GetAllAlbumLikes(int albumID);

        // Helper method to evaluate the result of the sqids ID
        int CheckSqidsID(string ID);
    }
}