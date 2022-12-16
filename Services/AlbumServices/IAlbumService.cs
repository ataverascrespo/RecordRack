using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlbumAPI.Services.AlbumServices
{
    public interface IAlbumService
    {
        //Method to return the list of all albums
        List<Album> GetAllAlbums();
        //Method to return the specified album as per ID
        Album GetAlbumByID(int ID);
        //Method to add album based on passed new model
        List<Album> AddAlbum(Album newAlbum);
    }
}