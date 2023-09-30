using System.Text;
using System.Text.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpotifyAPI.Web;

/// <summary>
/// Implementation of dependency injection
/// Service class handles data retrieval from the database
/// Forwards the results to the controller
/// </summary>
namespace API.Services.APIServices
{
    public class APIService : IAPIService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IHttpClientFactory _httpClientFactory;
        private String _spotifyClientID;
        private String _spotifyClientSecret;

        //Inject API services configuration
        public APIService(IConfiguration configuration, HttpClient httpClient, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _httpClientFactory = httpClientFactory;
            _spotifyClientID = _configuration.GetSection("SpotifySettings:ClientID").Value!;
            _spotifyClientSecret = _configuration.GetSection("SpotifySettings:ClientSecret").Value!;
        }

        //Method to get the spotify access token with env variables client secret 
        public async Task<ServiceResponse<string>> GetSpotifyAccessToken()
        {
            var serviceResponse = new ServiceResponse<string>();

            //Encode the client ID and secret to a Base-64 string to send in our HTTP post request and define the body
            var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{_spotifyClientID}:{_spotifyClientSecret}"));
            var content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

            //Add Basic authentication scheme to the request headers
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Basic {credentials}");

            var response = await _httpClient.PostAsync("https://accounts.spotify.com/api/token", content);
           
            //If the API call fails, send failure service response
            if (!response.IsSuccessStatusCode)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Failed to obtain access token.";
                return serviceResponse;
            }

            //Parse the response string to a JSON, which allows us to extract the access token
            var responseContent = await response.Content.ReadAsStringAsync();
            dynamic data = JObject.Parse(responseContent);
            serviceResponse.Data = data.access_token;

            return serviceResponse;
        }

        //Method to get albums from Spotify
        public async Task<ServiceResponse<SearchResponse>> GetAlbums(string searchQuery, string token) 
        {
            var serviceResponse = new ServiceResponse<SearchResponse>();

            //Create SpotifyClient   
            var spotify = new SpotifyClient(token);
            //Assemble search query by creating a request of enum type Album with the passed query
            var search = await spotify.Search.Item(new SearchRequest(
                SearchRequest.Types.Album, searchQuery
            ));

            if (search == null) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Could not find any albums.";
                return serviceResponse;
            }

            //Return the search results of the album
            serviceResponse.Data = search;
            return serviceResponse;
        }

        //Method to get tracks from Spotify
        public async Task<ServiceResponse<SearchResponse>> GetTracks(string searchQuery, string token) 
        {
            var serviceResponse = new ServiceResponse<SearchResponse>();

            //Create SpotifyClient   
            var spotify = new SpotifyClient(token);
            //Assemble search query by creating a request of enum type Album with the passed query
            var search = await spotify.Search.Item(new SearchRequest(
                SearchRequest.Types.Track, searchQuery
            ));

            if (search == null) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Could not find any albums.";
                return serviceResponse;
            }

            //Return the search results of the album
            serviceResponse.Data = search;
            return serviceResponse;
        }
    }
}