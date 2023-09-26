using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

/// <summary>
/// Serializes data into a proper format
/// Uses RESTful routing schemes to forward to client
/// </summary>
namespace AlbumAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController : ControllerBase
    {
        //Private album service field
        private readonly IAlbumService _albumService;

        //Inject the IAlbumController interface
        //Inject the IPhotoService for uploading photos
        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        //HTTP GET method
        //Return all albums
        [HttpGet("GetAll")]
        public async Task<ActionResult<ServiceResponse<List<GetAlbumDTO>>>> GetAlbums() 
        {
            //Return status code response upon completion of albumService.GetAllAlbums() thread
            return Ok(await _albumService.GetAllAlbums());
        }

        //HTTP GET method
        //Return a single album based on passed parameter ID
        [HttpGet("GetAlbumByID/{ID}")]
        public async Task<ActionResult<ServiceResponse<GetAlbumDTO>>> GetAlbum(int ID)
        {
            //Return status code response and model upon completion of albumService.GetAlbums() thread
            return Ok(await _albumService.GetAlbumByID(ID));
        }

         //HTTP GET method
        //Return a single album based on passed parameter user ID
        [HttpGet("GetAlbumsByUserID/{UserID}")]
        public async Task<ActionResult<ServiceResponse<GetAlbumDTO>>> GetAlbumsByUserID(int UserID)
        {
            //Return status code response and model upon completion of albumService.GetAlbums() thread
            return Ok(await _albumService.GetAlbumsByUserID(UserID));
        }

        //HTTP POST method
        //Add an album to the list of albums
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetAlbumDTO>>>> AddAlbum(AddAlbumDTO newAlbum)
        {
            //Return status code response upon completion of albumService.AddAlbum() thread
            return Ok(await _albumService.AddAlbum(newAlbum));
        }

        //HTTP PUT method
        //Update an album from the list of albums
        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<GetAlbumDTO>>>> UpdateAlbum(UpdateAlbumDTO updateAlbum)
        {        
            var response = await _albumService.UpdateAlbum(updateAlbum);
            if (response.Data == null) {
                //Return 404 error if null
                return NotFound(response);
            }

            //Return status code response upon completion of albumService.UpdateAlbum() thread
            return Ok(response);
        }

        //HTTP DELETE method
        //Return a single album based on passed parameter ID
        [HttpDelete("{ID}")]
        public async Task<ActionResult<ServiceResponse<GetAlbumDTO>>> DeleteAlbum(int ID)
        {
            var response = await _albumService.DeleteAlbum(ID);
            if (response.Data == null) {
                //Return 404 error if null
                return NotFound(response);
            }

            //Return status code response upon completion of albumService.DeleteeAlbum() thread
            return Ok();
        }       

        [HttpPost("{AlbumID}/Like")]
        public async Task<ActionResult<ServiceResponse<string>>> LikeAlbum(int AlbumID)
        {
             //Return status code response upon completion of albumService.LikeAlbum() thread
            return Ok(await _albumService.LikeAlbum(AlbumID));
        }

        //HTTP GET method
        //Return a single album based on passed parameter user ID
        [HttpGet("GetAlbumLikes/{AlbumID}")]
        public async Task<ActionResult<ServiceResponse<List<AlbumLikesDTO>>>> GetAlbumLikes(int AlbumID)
        {
            //Return status code response and model upon completion of albumService.GetAlbums() thread
            return Ok(await _albumService.GetAllAlbumLikes(AlbumID));
        }
    }
}