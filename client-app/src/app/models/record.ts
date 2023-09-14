export interface AddRecord {
  albumName: string
  artistName: string
  releaseDate: string
  albumType: string
  albumDescription: string
  dateAdded: string
  photoURL: string
  spotifyID: string
  isPrivate: boolean
}

export interface SavedRecord {
  id: number
  albumName: string
  artistName: string
  releaseDate: string
  albumType: string
  albumDescription: string
  dateAdded: string
  photoURL: string
  spotifyID: string
  isPrivate: boolean
}