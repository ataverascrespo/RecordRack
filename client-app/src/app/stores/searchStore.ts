import {makeAutoObservable, runInAction} from "mobx";
import { SpotifyAlbum } from "../models/spotifyAlbum";
import { SpotifyTrack } from "../models/spotifyTrack";

// Spotify search data store class
export default class SearchStore {
    isSearchLoading = false;
    searchAlbums: SpotifyAlbum[] = [];
    searchTracks: SpotifyTrack[] = [];
    searchType: string = "";

    selectedAlbum: SpotifyAlbum | undefined = undefined;

    constructor() { 
        makeAutoObservable(this)
    }

    setSearchAlbums = (albums: SpotifyAlbum[]) => {
        runInAction(() => {
            this.searchAlbums = albums;
            this.searchType = "album";
            this.isSearchLoading = false;
        })
    }

    setSearchTracks = (tracks: SpotifyTrack[]) => {
        runInAction(() => {
            this.searchTracks = tracks;
            this.searchType = "track";
            this.isSearchLoading = false;
        })
    }

    selectAlbum = (id: string) => {
        this.selectedAlbum = this.searchAlbums.find(a => a.id === id)
    }

    cancelSelectedAlbum = () => {
        this.selectedAlbum = undefined;
    }

    setSearchLoading = () => {
        this.isSearchLoading = true;
    }
}