using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Implementation of dependency injection
/// Service class handles data retrieval from the database
/// Forwards the results to the controller
/// </summary>
namespace AlbumAPI.Services.AlbumServices
{
    public class AlbumService : IAlbumService
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
                AlbumDescription="Smino's first album.",
                AlbumRating=10,
            },
            new Album
            {
                ID=2,
                AlbumName="NOIR",
                ArtistName="Smino",
                YearReleased="2018",
                AlbumGenre="Rap",
                AlbumDescription="Smino's second album.",
                AlbumRating=8,
            }
        };

       
        //Method to add album based on passed new model
        public async Task<ServiceResponse<List<GetAlbumDTO>>> GetAllAlbums()
        {
            //Create wrapper model for album list
            var ServiceResponse = new ServiceResponse<List<GetAlbumDTO>>();
           
            //Add list of albums to wrapper object and return
            ServiceResponse.Data = albums;
            return ServiceResponse;
        }
        //Method to return the specified album as per ID
        public async Task<ServiceResponse<GetAlbumDTO>> GetAlbumByID(int ID)
        {
            //Create wrapper model for album 
            var ServiceResponse = new ServiceResponse<GetAlbumDTO>();
            
            //Find first album where the ID of the album is equal 
            var album = albums.FirstOrDefault((a => a.ID == ID));
            
            //Add list of albums to wrapper object and return
            //The previous null check in this method can be removed as the wrapper object's properties are nullable
            ServiceResponse.Data = album;
            return ServiceResponse;
        }
         //Method to return the list of all albums
        public async Task<ServiceResponse<List<AddAlbumDTO>>> AddAlbum(AddAlbumDTO newAlbum)
        {
            //Create wrapper model for album list
            var ServiceResponse = new ServiceResponse<List<AddAlbumDTO>>();
            
            //Add passed album to the list of albums
            albums.Add(newAlbum);
            
            //Add albums list to wrapper and return
            ServiceResponse.Data = albums;
            return ServiceResponse;
        }
    }
}