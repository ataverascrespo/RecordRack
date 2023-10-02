import { ProfileUser } from "./profile"
import { User } from "./user"

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

export interface UpdateRecord {
  id: string
  albumDescription: string
  isPrivate: boolean
}

export interface SavedRecord {
  id: string
  albumName: string
  artistName: string
  releaseDate: string
  albumType: string
  albumDescription: string
  dateAdded: string
  photoURL: string
  spotifyID: string
  isPrivate: boolean
  user: User
  likes: ProfileUser[]
}