using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlbumAPI.Models
{
    public class Album
    {
        public int ID { get; set; }
        public string AlbumName { get; set; } = string.Empty;
        public string ArtistName { get; set; } = string.Empty;
        public string YearReleased { get; set; } = string.Empty;
        public string AlbumGenre { get; set; } = string.Empty;
        public string AlbumDescription { get; set; } = string.Empty;
        public int AlbumRating { get; set; } 
    }
}