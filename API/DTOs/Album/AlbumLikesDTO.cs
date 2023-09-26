using AlbumAPI.DTOs.Profile;

/// <summary>
/// Data Transfer Object responsible for sending data from client to server
/// </summary>
namespace AlbumAPI.DTOs.Album
{
    public class AlbumLikesDTO
    {
        public ProfileDTO? User { get; set; }
    }
}