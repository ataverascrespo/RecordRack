using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlbumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController : ControllerBase
    {
        //Private album service field
        private readonly IAlbumService _albumService;

        //AlbumController Constructor
        public AlbumController(IAlbumService albumService)
        {
           _albumService = albumService;
        }

        //HTTP GET method
        //Return all albums
        [HttpGet("GetAll")]
        public ActionResult<List<Album>> GetAlbums() {
            //Return status code response from albumService.GetAllAlbums()
            return Ok(_albumService.GetAllAlbums());
        }

        //HTTP GET method
        //Return a single album based on passed parameter ID
        [HttpGet("{ID}")]
        public ActionResult<Album> GetAlbum(int ID)
        {
            //Return status code response and model from albumService.GetAlbums()
            return Ok(_albumService.GetAlbumByID(ID));
        }

        //HTTP POST method
        //Add an album to the list of albums
        [HttpPost]
        public ActionResult<List<Album>> AddAlbum(Album newAlbum)
        {
            //Return status code response from albumService.AddAlbum()
            return Ok(_albumService.AddAlbum(newAlbum));
        }
       
    }
}