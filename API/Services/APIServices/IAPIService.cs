using Newtonsoft.Json.Linq;
using SpotifyAPI.Web;

/// <summary>
/// API services method declarations
/// </summary>
namespace API.Services.APIServices
{
    public interface IAPIService
    {
        //Method to get the spotify access token with env variables client secret 
        Task<ServiceResponse<string>> GetSpotifyAccessToken();

        //Method to get albums from Spotify
        Task<ServiceResponse<SearchResponse>> GetAlbums(string searchQuery, string token);

        //Method to get tracks from Spotify
        Task<ServiceResponse<SearchResponse>> GetTracks(string searchQuery, string token);
    }
}