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
        //Returns a database set of type User
        //Allows us to query and save users
        public DbSet<User> Users => Set<User>();

        // Configure entity relationships between Album and User
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Album>()
                .HasOne(album => album.User)
                .WithMany(user => user.Albums);

            base.OnModelCreating(modelBuilder);
        }
    }
}