using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

       
        //Method to add album based on passed new model
        public async Task<List<Album>> GetAllAlbums()
        {
            //Return list of albums
            return albums;
        }
        //Method to return the specified album as per ID
        public async Task<Album> GetAlbumByID(int ID)
        {
            //Find first album where the ID of the album is equal 
            var album = albums.FirstOrDefault((a => a.ID == ID));
            if (album != null)
            {
                return album;
            }
            throw new Exception("Album not found");
        }
         //Method to return the list of all albums
        public async Task<List<Album>> AddAlbum(Album newAlbum)
        {
           //Add passed album to the list of albums
            albums.Add(newAlbum);
            //Returnlist of albums
            return albums;
        }
    }
}