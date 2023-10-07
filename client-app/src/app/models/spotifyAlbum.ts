/**
 * Name: spotifyAlbum.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This file contains the interface definitions for Spotify Album related models, and defines their types and structures
 *          - SpotifyAlbum interface
 *          - SpotifyArtist interface
 *          - SpotifyAlbumURL interface
 *          - SpotifyArtistURL interface
 *          - SpotifyImage interface
*/

// Define the SpotifyAlbum interface and properties
export interface SpotifyAlbum {
    albumType: string
    artists: SpotifyArtist[]
    externalUrls: SpotifyAlbumURL
    href: string
    id: string
    images: SpotifyImage[]
    isPlayable: boolean
    name: string
    releaseDate: string
    releaseDatePrecision: string
    totalTracks: number
    type: string
    uri: string
}

// Define the SpotifyArtist interface and properties
export interface SpotifyArtist {
    externalUrls: SpotifyArtistURL
    href: string
    id: string
    name: string
    type: string
    uri: string
}

// Define the SpotifyAlbumURL interface and properties
export interface SpotifyAlbumURL {
    spotify: string
}

// Define the SpotifyArtistURL interface and properties
export interface SpotifyArtistURL {
    spotify: string
}

// Define the SpotifyImage interface and properties
export interface SpotifyImage {
    height: number
    url: string
    width: number
}
