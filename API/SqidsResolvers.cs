using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AlbumAPI.DTOs.Profile;
using Sqids;

namespace API
{
    public class SqidsIDResolver : IValueResolver<Album, GetAlbumDTO, string>
    {

        private readonly SqidsEncoder<int> _sqids;

        public SqidsIDResolver(SqidsEncoder<int> sqids)
        {
            _sqids = sqids;
        }

        public string Resolve(Album source, GetAlbumDTO destination, string destMember, ResolutionContext context)
        {
            // Use your custom package to convert the AlbumID (int) to a unique string
            int albumID = source.ID;
            string encodedAlbumId = _sqids.Encode(albumID);

            return encodedAlbumId;
        }
    }
    
    public class SqidsLikeIDResolver : IValueResolver<AlbumLike, NotificationDTO, string>
    {

        private readonly SqidsEncoder<int> _sqids;

        public SqidsLikeIDResolver(SqidsEncoder<int> sqids)
        {
            _sqids = sqids;
        }

        public string Resolve(AlbumLike source, NotificationDTO destination, string destMember, ResolutionContext context)
        {
            // Use your custom package to convert the AlbumID (int) to a unique string
            int albumID = source.AlbumID;
            string encodedAlbumId = _sqids.Encode(albumID);

            return encodedAlbumId;
        }
    }
}