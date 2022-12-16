using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Generic type wrapper object returned with every service call
/// </summary>
namespace AlbumAPI.Models
{
    public class ServiceResponse<T>
    {
        //Nullable generic property
        public T? Data { get; set; }
        public bool Success { get; set; } = true;
        public string ReturnMessage { get; set; } = string.Empty;
    }
}