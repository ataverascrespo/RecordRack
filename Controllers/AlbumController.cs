using AlbumAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlbumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController : ControllerBase
    {
        //Create a list of album models
        private static List<Album> albums = new List<Album>
        {
            new Album
            {
                ID=1,
                AlbumName="Blkswn",
                ArtistName="Smino",
                YearReleased="2017",
                AlbumGenre="Rap",
                AlbumDescription="Smino's first album."
            },
            new Album
            {
                ID=2,
                AlbumName="NOIR",
                ArtistName="Smino",
                YearReleased="2018",
                AlbumGenre="Rap",
                AlbumDescription="Smino's second album."
            }
        };

        //HTTP GET method
        //Return all albums
        [HttpGet("GetAll")]
        public ActionResult<List<Album>> GetAlbums() {
            //Return status code response
            return Ok(albums);
        }

        //HTTP GET method
        //Return a single album based on passed parameter ID
        [HttpGet("{ID}")]
        public ActionResult<Album> GetAlbum(int ID)
        {
            //Find album where the ID of the album is equal to ID parameter from HTTP GET
            var album = albums.FirstOrDefault((a => a.ID == ID));
            //If the album doesn't exist...
            if (album == null)
            //...Return 404 Not Found
                return NotFound("That album doesn't exist.");
            //Return status code response and model
            return Ok(album);
        }
    }
}