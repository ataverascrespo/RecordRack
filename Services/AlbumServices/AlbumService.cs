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

        //Configure private mapper field
        private readonly IMapper _mapper;

        //AutoMapper Constructor
        public AlbumService(IMapper mapper)
        {
            _mapper = mapper;
        }

        //Method to add album based on passed new model
        public async Task<ServiceResponse<List<GetAlbumDTO>>> GetAllAlbums()
        {
            //Create wrapper model for album list
            var ServiceResponse = new ServiceResponse<List<GetAlbumDTO>>();
           
            //Map all Album models to GetAlbumDTO w/ AutoMapper
            ServiceResponse.Data = albums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToList();
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
            //Map returned Album model to GetAlbumDTO w/ AutoMapper
            ServiceResponse.Data = _mapper.Map<GetAlbumDTO>(album);
            return ServiceResponse;
        }

        //Method to return the list of all albums
        public async Task<ServiceResponse<List<GetAlbumDTO>>> AddAlbum(AddAlbumDTO newAlbum)
        {
            //Create wrapper model for album list
            var ServiceResponse = new ServiceResponse<List<GetAlbumDTO>>();

            //Map AddCharacterDTO to Album Model w/ AutoMapper
            var album = _mapper.Map<Album>(newAlbum);
            
            //Find Max ID value in list of albums - new ID is auto-incremented upon Max
            album.ID = albums.Max(a => a.ID) + 1;

            //Add passed album to the list of albums
            albums.Add(album);

            //Map current Album model to GetAlbumDTO w/ AutoMapper
            //Add albums list to wrapper and return 
            ServiceResponse.Data = albums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToList();
            return ServiceResponse;
        }
    }
}