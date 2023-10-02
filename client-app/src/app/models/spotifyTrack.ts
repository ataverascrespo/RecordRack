export interface SpotifyTrack {
    album: SpotifyTrackAlbum
    externalUrls: SpotifyTrackURL
    name: string
    id: string
    type: string
}

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

export interface SpotifyTrackArtist {
    externalUrls: SpotifyTrackExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface SpotifyTrackExternalUrls {
    spotify: string
}

export interface SpotifyTrackImage {
    height: number
    url: string
    width: number
}

export interface SpotifyTrackURL {
    spotify: string
}
