using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Album services method declarations
/// </summary>
namespace AlbumAPI.Services.AlbumServices
{
    public interface IAlbumService
    {
        //Method to return the list of all albums
        Task<ServiceResponse<List<Album>>> GetAllAlbums();
        //Method to return the specified album as per ID
        Task<ServiceResponse<Album>> GetAlbumByID(int ID);
        //Method to add album based on passed new model
        Task<ServiceResponse<List<Album>>> AddAlbum(Album newAlbum);
    }
}