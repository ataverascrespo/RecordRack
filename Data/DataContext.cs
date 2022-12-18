using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Provides an abstraction of data that allows us to work with database tables directly
/// </summary>
namespace AlbumAPI.Data
{
    public class DataContext : DbContext
    {
        //Data context constructor
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        //Returns a database set of type Album
        //Allows us to query and save albums
        public DbSet<Album> Albums => Set<Album>();
    }
}