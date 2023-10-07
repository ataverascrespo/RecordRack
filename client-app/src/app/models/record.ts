/**
 * Name: record.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This file contains the interface definitions for Record related models, and defines their types and structures
 *          - AddRecord interface
 *          - UpdateRecord interface
 *          - SavedRecord interface
*/

import { ProfileUser } from "./profile"
import { User } from "./user"

// Define the AddRecord interface and properties
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

// Define the UpdateRecord interface and properties
export interface UpdateRecord {
  id: string
  albumDescription: string
  isPrivate: boolean
}

// Define the SavedRecord interface and properties
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