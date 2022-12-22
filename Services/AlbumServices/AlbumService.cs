/// <summary>
/// Implementation of dependency injection
/// Service class handles data retrieval from the database
/// Forwards the results to the controller
/// </summary>
namespace AlbumAPI.Services.AlbumServices
{
    public class AlbumService : IAlbumService
    {
        //Configure private mapper field
        private readonly IMapper _mapper;

        //Inject data context for DB access
        private readonly DataContext _context;

        //AutoMapper Constructor
        public AlbumService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        //Method to add album based on passed new model
        public async Task<ServiceResponse<List<GetAlbumDTO>>> GetAllAlbums(int userID)
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();
            
            //Access database albums table
            var dbAlbums = await _context.Albums.ToListAsync();
            
            //Map all Album models to GetAlbumDTO w/ AutoMapper
            serviceResponse.Data = dbAlbums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToList();
            return serviceResponse;
        }

        //Method to return the specified album as per ID
        public async Task<ServiceResponse<GetAlbumDTO>> GetAlbumByID(int ID)
        {
            //Create wrapper model for album DTO 
            var serviceResponse = new ServiceResponse<GetAlbumDTO>();
            
            //Access database albums table
            var dbAlbum = await _context.Albums.FirstOrDefaultAsync((a => a.ID == ID));
            
            //Add list of albums to wrapper object and return
            //The previous null check in this method can be removed as the wrapper object's properties are nullable
            //Map returned Album model to GetAlbumDTO w/ AutoMapper
            serviceResponse.Data = _mapper.Map<GetAlbumDTO>(dbAlbum);
            return serviceResponse;
        }

        //Method to return the list of all albums
        public async Task<ServiceResponse<List<GetAlbumDTO>>> AddAlbum(AddAlbumDTO newAlbum)
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();

            //Map AddCharacterDTO to Album Model w/ AutoMapper
            var album = _mapper.Map<Album>(newAlbum);

            //Add album to the DB albums table and auto generate a new ID
            _context.Albums.Add(album);

            //Save changes to DB album table
            await _context.SaveChangesAsync();

            //Map current Album model to GetAlbumDTO w/ AutoMapper
            //Add albums list to wrapper and return 
            serviceResponse.Data = await _context.Albums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToListAsync();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetAlbumDTO>> UpdateAlbum(UpdateAlbumDTO updateAlbum)
        {
            //Create wrapper model for album DTO
            var serviceResponse = new ServiceResponse<GetAlbumDTO>();

            try
            {
                //Find first or default album in DB albums table where the ID of the passed album is equal 
                var album = await _context.Albums.FirstOrDefaultAsync(a => a.ID == updateAlbum.ID);
                if (album == null)
                {
                    throw new Exception($"Album with ID '{updateAlbum.ID}' not found");
                }

                album.AlbumName = updateAlbum.AlbumName;
                album.ArtistName = updateAlbum.ArtistName;
                album.YearReleased = updateAlbum.YearReleased;
                album.AlbumGenre = updateAlbum.AlbumGenre;
                album.AlbumDescription = updateAlbum.AlbumDescription;
                album.AlbumRating = updateAlbum.AlbumRating;

                //Save changes to database Album table
                await _context.SaveChangesAsync();

                //Map Album model to GetAlbumDTO w/ AutoMapper
                //Add albums list to wrapper and return 
                serviceResponse.Data = _mapper.Map<GetAlbumDTO>(album);
            } 
            catch (Exception ex) 
            {
                //If album does not exist
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetAlbumDTO>>> DeleteAlbum(int ID)
        {
            //Create wrapper model for album DTO
            var serviceResponse = new ServiceResponse<List<GetAlbumDTO>>();

            try
            {
                //Find first album where the ID of the passed album is equal 
                var album = await _context.Albums.FirstOrDefaultAsync(a => a.ID == ID);
                if (album == null)
                {
                    throw new Exception($"Album with ID '{ID}' not found");
                }
                //Remove selected album from database
                _context.Albums.Remove(album);

                //Save changes to DB album table
                await _context.SaveChangesAsync();

                //Map all Album models to GetAlbumDTO w/ AutoMapper
                serviceResponse.Data = await _context.Albums.Select(a => _mapper.Map<GetAlbumDTO>(a)).ToListAsync();
            } 
            catch (Exception ex) 
            {
                //If album does not exist
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = ex.Message;
            }

            return serviceResponse;
        }
    }
}