using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Security.Cryptography;
using AlbumAPI.Services.EmailServices;
using Microsoft.IdentityModel.Tokens;
using Sqids;

/// <summary>
/// Encapsulates logic required to access data sources
/// No SQL queries required thanks to LINQ (language integrated query)
/// </summary>
namespace AlbumAPI.Data
{
    public class AlbumRepository : IAlbumRepository
    {
        private readonly DataContext _context;

        private readonly SqidsEncoder<int> _sqids;

        //Inject data context, needed for DB access
        //Inject IConfiguration, needed to access JSON token
        public AlbumRepository(DataContext context, SqidsEncoder<int> sqids)
        {
            _context = context;
            _sqids = sqids;

        }

        //General method to save DB changes
        public async Task SaveChanges() {
            //Save changes to database table
            await _context.SaveChangesAsync();
        }

        // Method to get all albums
        public async Task<List<Album>> GetAllAlbums(int userID)
        {
            //Access database albums table where User ID is valid
            var albums = await _context.Albums
                .Where(a => a.User!.ID == userID)
                .OrderBy(a => a.DateAdded)
                .Include(album => album.User)
                .ToListAsync();

            return albums;
        }
        
        // Method to get album by specified user ID and album ID
        public async Task<Album> GetAlbumByUserAndAlbumID (int userID, int albumID)
        {
            var album = await _context.Albums.Include(album => album.User)
                .FirstOrDefaultAsync(a => a.ID == albumID && (!a.isPrivate || a.User.ID == userID));
            return album!;
        }

        public async Task<List<Album>> GetAlbumsByUserID(int userID, int currentUserID)
        {
            //Access database albums table where album and users ID are valid
            //Remove albums where isPrivate is = true if user is not current user
            var albums = await _context.Albums
                .Where(a => (a.User!.ID == userID && !a.isPrivate) || (userID == currentUserID && a.User!.ID == userID))
                .OrderBy(a => a.DateAdded)
                .Include(album => album.User)
                .ToListAsync();

            return albums;
        }

        // Method to get the associated user of an album
        public async Task<User> GetAlbumUser(int userID)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == userID);
            return user!;
        }

        // Method to check if the specified album has already been added
        public async Task<Album> CheckAlbumExists(string spotifyID, Album album)
        {
            // Search the DB to see if there is an instance of the album where it's Spotify ID already is stored for a given user
            var exists = await _context.Albums.FirstOrDefaultAsync(a => a.SpotifyID.Equals(spotifyID) && a.User!.ID == album.User!.ID);
            return exists!;
        }

        // Method to save album in DB
        public async Task AddAlbum(Album album)
        {
            await _context.Albums.AddAsync(album);
        }

        // Post add/delete method to return albums for the current user
        public async Task<List<Album>> ReturnNewAlbumListByUserID(int userID)
        {
            // Return albums where IDs are matching
            var albums = await _context.Albums.Where(a => a.User!.ID == userID).ToListAsync();
            return albums;
        }

        // Method that returns the album that is requesting to be updated
        public async Task<Album> GetAlbumToUpdate(int albumID)
        {
            var album = await _context.Albums.Include(a => a.User).FirstOrDefaultAsync(a => a.ID == albumID);
            return album!;
        }
        
        // Method that returns the album that is being deleted
        public async Task<Album> GetAlbumToRemove(int albumID, int userID)
        {
            var album = await _context.Albums.FirstOrDefaultAsync(a => a.ID == albumID && a.User!.ID == userID);
            return album!;
        }

        // Method to remove the album from the database
        public async Task RemoveAlbum(Album album)
        {
            //Remove selected album from database
            _context.Albums.Remove(album);
            //Save changes to DB album table
            await SaveChanges();
        }

        // Method to get an album by its ID, with the corresponding likes included in the query
        public async Task<Album> GetAlbumByAlbumIDIncludeLikes(int albumID)
        {
            var album = await _context.Albums.Include(a => a.Likes).FirstOrDefaultAsync(a => a.ID == albumID);
            return album!;
        }

        // Method to get all the likes for a user
        public async Task<List<AlbumLike>> GetAllAlbumLikes(int albumID)
        {
            //Access database albums table where User ID is valid
            var likes = await _context.AlbumLikes.Where(a => a.AlbumID == albumID).Include(likes => likes.User).ToListAsync();
            return likes!;
        }

        // Helper method to evaluate the result of the sqids ID
        public int CheckSqidsID(string ID) 
        {
            if (_sqids.Decode(ID) is [var decodedID] && ID == _sqids.Encode(decodedID))
            {
                return decodedID;            
            }
            else {
                // Return -1 instead of bool bc i can
                return -1;
            }
        }
    }
}
