using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AlbumAPI.API.Migrations;
using AlbumAPI.DTOs.Profile;

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
            //Create a mapping profile for User to UserDTO
            CreateMap<User, UserDTO>();
            //Create a mapping profile for User to ProfileDTO
            CreateMap<User, ProfileDTO>();
            //Create a mapping profile for AlbumLikes to AlbumLikes DTO
            CreateMap<AlbumLike, AlbumLikesDTO>();
        }
    }
}