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

export interface SpotifyArtist {
    externalUrls: SpotifyArtistURL
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface SpotifyAlbumURL {
    spotify: string
}

export interface SpotifyArtistURL {
    spotify: string
}

export interface SpotifyImage {
    height: number
    url: string
    width: number
}
