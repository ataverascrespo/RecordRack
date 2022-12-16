using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlbumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /// <summary>
    /// Serializes data into a proper format
    /// Uses RESTful routing schemes to forward to client
    /// </summary>
    public class AlbumController : ControllerBase
    {
        //Private album service field
        private readonly IAlbumService _albumService;

        //AlbumController Constructor
        //This enables dependency injection - the service provides the controller with it's dependent objects
        public AlbumController(IAlbumService albumService)
        {
           _albumService = albumService;
        }

        //HTTP GET method
        //Return all albums
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Album>>> GetAlbums() {
            //Return status code response upon completion of albumService.GetAllAlbums() thread
            return Ok(await _albumService.GetAllAlbums());
        }

        //HTTP GET method
        //Return a single album based on passed parameter ID
        [HttpGet("{ID}")]
        public async Task<ActionResult<Album>> GetAlbum(int ID)
        {
            //Return status code response and model upon completion of albumService.GetAlbums() thread
            return Ok(await _albumService.GetAlbumByID(ID));
        }

        //HTTP POST method
        //Add an album to the list of albums
        [HttpPost]
        public async Task<ActionResult<List<Album>>> AddAlbum(Album newAlbum)
        {
            //Return status code response upon completion of albumService.AddAlbum() thread
            return Ok(await _albumService.AddAlbum(newAlbum));
        }
       
    }
}