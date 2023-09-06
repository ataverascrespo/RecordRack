export interface Album {
    album_type: string
    artists: Artist[]
    external_urls: AlbumURL
    href: string
    id: string
    images: Image[]
    is_playable: boolean
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}

export interface Artist {
    external_urls: ArtistURL
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface AlbumURL {
    spotify: string
}

export interface ArtistURL {
    spotify: string
}

export interface Image {
    height: number
    url: string
    width: number
}
