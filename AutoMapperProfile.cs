using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Configures mapping profiles for NuGet AutoMapper
/// </summary>
namespace AlbumAPI
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Create a mapping profile for Album to AddAlbumDTO
            CreateMap<Album, GetAlbumDTO>();
            //Create a mapping profile for AddAlbumDTO to Album
            CreateMap<AddAlbumDTO, Album>();
        }
    }
}