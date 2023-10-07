/**
 * Name: spotifyTrack.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This file contains the interface definitions for Spotify Track related models, and defines their types and structures
 *          - SpotifyTrack interface
 *          - SpotifyTrackAlbum interface
 *          - SpotifyTrackArtist interface
 *          - SpotifyTrackExternalUrls interface
 *          - SpotifyTrackImage interface
 *          - SpotifyTrackURL interface
*/

// Define the SpotifyTrack interface and properties
export interface SpotifyTrack {
    album: SpotifyTrackAlbum
    externalUrls: SpotifyTrackURL
    name: string
    id: string
    type: string
}

// Define the SpotifyTrackAlbum interface and properties
export interface SpotifyTrackAlbum {
    albumType: string
    artists: SpotifyTrackArtist[]
    href: string
    id: string
    images: SpotifyTrackImage[]
    isPlayable: boolean
    name: string
    releaseDate: string
    releaseDatePrecision: string
    totalTracks: number
    type: string
    uri: string
}

// Define the SpotifyTrackArtist interface and properties
export interface SpotifyTrackArtist {
    externalUrls: SpotifyTrackExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

// Define the SpotifyTrackExternalUrls interface and properties
export interface SpotifyTrackExternalUrls {
    spotify: string
}

// Define the SpotifyTrackImage interface and properties
export interface SpotifyTrackImage {
    height: number
    url: string
    width: number
}

// Define the SpotifyTrackURL interface and properties
export interface SpotifyTrackURL {
    spotify: string
}
