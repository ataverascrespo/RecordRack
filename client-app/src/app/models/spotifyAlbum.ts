export interface SpotifyAlbum {
    album_type: string
    artists: SpotifyArtist[]
    external_urls: SpotifyAlbumURL
    href: string
    id: string
    images: SpotifyImage[]
    is_playable: boolean
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}

export interface SpotifyArtist {
    external_urls: SpotifyArtistURL
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
