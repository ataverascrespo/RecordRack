import {makeAutoObservable} from "mobx";
import { Album } from "../models/album";
import { SpotifyTrack } from "../models/spotifyTrack";

// Spotify search data store class
export default class SearchStore {
    searchAlbums: Album[] = [];
    searchTracks: SpotifyTrack[] = [];
    searchType: string = "";

    constructor() { 
        makeAutoObservable(this)
    }

    setSearchAlbums = (albums: Album[]) => {
        this.searchAlbums = albums;
        this.searchType = "album";
    }

    setSearchTracks = (tracks: SpotifyTrack[]) => {
        this.searchTracks = tracks;
        this.searchType = "track";
    }
}