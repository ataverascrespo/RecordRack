using System;
using System.Collections.Generic;
using API.Services.APIServices;
using Microsoft.AspNetCore.Authorization;

/// <summary>
/// Serializes data into a proper format
/// Uses RESTful routing schemes to forward to client
/// </summary>
namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class APIController : ControllerBase
    {
        //Private api service field
        private readonly IAPIService _apiService;

        //Inject the IAPIController interface
        public APIController(IAPIService apiService)
        {
            _apiService = apiService;
        }
    
        [HttpGet("SpotifyAlbumSearch")]
        public async Task<ActionResult<ServiceResponse<string>>> GetAlbums(string albumQuery)
        {
            var result = await _apiService.GetSpotifyAccessToken();
            if (!result.Success)
            {
                return BadRequest(result.ReturnMessage);
            }

            //Return status code response upon completion of apiService.GetAlbums() thread
            return Ok(await _apiService.GetAlbums(albumQuery, result.Data!));
        }

        [HttpGet("SpotifyTrackSearch")]
        public async Task<ActionResult<ServiceResponse<string>>> GetTracks(string trackQuery)
        {
            var result = await _apiService.GetSpotifyAccessToken();
            if (!result.Success)
            {
                return BadRequest(result.ReturnMessage);
            }

            //Return status code response upon completion of apiService.GetAlbums() thread
            return Ok(await _apiService.GetTracks(trackQuery, result.Data!));
        }
    }
}