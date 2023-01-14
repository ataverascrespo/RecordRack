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

        //Private photo service field
        private readonly IPhotoService _photoService;

        //Inject the IAlbumController interface
        //Inject the IPhotoService for uploading photos
        public AlbumController(IAlbumService albumService, IPhotoService photoService)
        {
            _albumService = albumService;
            _photoService = photoService;
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
        [HttpGet("{ID}")]
        public async Task<ActionResult<ServiceResponse<GetAlbumDTO>>> GetAlbum(int ID)
        {
            //Return status code response and model upon completion of albumService.GetAlbums() thread
            return Ok(await _albumService.GetAlbumByID(ID));
        }

        //HTTP POST method
        //Add an album to the list of albums
        [HttpPost]
        //Specify Content-Type header for client
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ServiceResponse<List<AddAlbumDTO>>>> AddAlbum([FromForm] AddAlbumDTO newAlbum, [FromForm] IFormFile file)
        {
            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            //Return status code response upon completion of albumService.AddAlbum() thread
            return Ok(await _albumService.AddAlbum(newAlbum, result));
        }

        //HTTP PUT method
        //Update an album from the list of albums
        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<AddAlbumDTO>>>> UpdateAlbum(UpdateAlbumDTO updateAlbum)
        {        
            var response = await _albumService.UpdateAlbum(updateAlbum);
            if (response.Data == null) {
                //Return 404 error if null
                return NotFound(response);
            }

            //Return status code response upon completion of albumService.UpdateAlbum() thread
            return Ok();
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

        [HttpDelete("DeletePhoto")]
        public  async Task<ActionResult<ServiceResponse<GetAlbumDTO>>> DeletePhoto(string ID)
        {
            //Return status code response upon completion of photoService.deletePhotoAsync thread
            return Ok(await _photoService.DeletePhotoASync(ID));
        }
       
    }
}