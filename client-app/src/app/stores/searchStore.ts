import {makeAutoObservable} from "mobx";
import { SpotifyAlbum } from "../models/spotifyAlbum";
import { SpotifyTrack } from "../models/spotifyTrack";

// Spotify search data store class
export default class SearchStore {
    searchAlbums: SpotifyAlbum[] = [];
    searchTracks: SpotifyTrack[] = [];
    searchType: string = "";

    constructor() { 
        makeAutoObservable(this)
    }

    setSearchAlbums = (albums: SpotifyAlbum[]) => {
        this.searchAlbums = albums;
        this.searchType = "album";
    }

    setSearchTracks = (tracks: SpotifyTrack[]) => {
        this.searchTracks = tracks;
        this.searchType = "track";
    }
}