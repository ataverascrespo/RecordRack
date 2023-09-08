export interface SpotifyTrack {
    album: SpotifyTrackAlbum
    external_urls: SpotifyTrackURL
    name: string
    id: string
    type: string
}

export interface SpotifyTrackAlbum {
    album_type: string
    artists: SpotifyTrackArtist[]
    href: string
    id: string
    images: SpotifyTrackImage[]
    is_playable: boolean
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}

export interface SpotifyTrackArtist {
    external_urls: SpotifyTrackExternalUrls
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
