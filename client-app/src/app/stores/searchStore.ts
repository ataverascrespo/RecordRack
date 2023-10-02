import { makeAutoObservable, runInAction } from "mobx";
import { SpotifyAlbum } from "../models/spotifyAlbum";
import { SpotifyTrack } from "../models/spotifyTrack";
import agent from "../api/serviceAgent";

// Spotify search data store class
export default class SearchStore {
    isSearchLoading = false;
    searchAlbums: SpotifyAlbum[] = [];
    searchTracks: SpotifyTrack[] = [];
    
    //Set default search type string to album for first render
    searchType: string = "album";
    searchQuery: string = "";

    selectedAlbum: SpotifyAlbum | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    getAlbums = async (searchQuery: string) => {
        runInAction(() => {
            this.isSearchLoading = true;
            this.searchQuery = searchQuery;
        });
        try {
            const response = await agent.Spotify.getAlbums(searchQuery);
            console.log(response);
            
            if (response.success === true) {
                // Create an array of unique albums and a set of seen albums
                // this allows me to filter out albums that are duplicates (i.e explicit/non-explicit, re-releases)
                const uniqueAlbums: any[] = [];
                const seenAlbums = new Set();

                response.data.albums.items.forEach((album: SpotifyAlbum) => {
                    // Create an identifier for each returned album
                    const albumIdentifier = `${album.name} - ${album.artists[0].name}`;
                    if (!seenAlbums.has(albumIdentifier)) {
                        seenAlbums.add(albumIdentifier);
                        uniqueAlbums.push(album);
                    }
                });
                const albums = uniqueAlbums.filter((item: any) => item.albumType === "album");
                // Set the albums data in the global search store state
                this.setSearchAlbums(albums);
                
                return response;
            }            
        } catch (error) {
            throw error;
        }
    }

    getTracks = async (searchQuery: string) => {
        runInAction(() => {
            this.isSearchLoading = true;
            this.searchQuery = searchQuery;
        });
        try {
            const response = await agent.Spotify.getTracks(searchQuery);
            console.log(response);

            if (response.success == true) {
                // Create an array of unique tracks and a set of seen tracks
                // this allows me to filter out tracks that are duplicates (i.e explicit/non-explicit, re-releases)
                const uniqueTracks: any[] = [];
                const seenTracks = new Set();
                response.data.tracks.items.forEach((track: SpotifyTrack) => {
                    // Create an identifier for each returned track
                    const trackIdentifier = `${track.name} - ${track.album.artists[0].name}`;
                    if (!seenTracks.has(trackIdentifier)) {
                        seenTracks.add(trackIdentifier);
                        uniqueTracks.push(track);
                    }
                });
                // Set the tracks data in the global search store state
                this.setSearchTracks(uniqueTracks);
            }
            return response;
        } catch (error) {
            throw error;
        }
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