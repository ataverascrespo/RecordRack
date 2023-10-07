/**
 * Name: searchStore.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This is a domain store responsible for the logic handled by the Spotify Search feature of the app.
 *          The main responsibility of domain stores is to move as much logic and state out of the components as possible. 
*/

import { makeAutoObservable, runInAction } from "mobx";
import { SpotifyAlbum } from "../models/spotifyAlbum";
import { SpotifyTrack } from "../models/spotifyTrack";
import agent from "../api/serviceAgent";

// Spotify search data store class
export default class SearchStore {

    // Define the default class properties
    isSearchLoading = false;
    searchAlbums: SpotifyAlbum[] = [];
    searchTracks: SpotifyTrack[] = [];
    //Set default search type string to album for first render
    searchType: string = "album";
    searchQuery: string = "";
    selectedAlbum: SpotifyAlbum | undefined = undefined;

    // Set this store as observable.
    // In Mobx, making a class or property observable means that that object's state is globally stored, and changes are always tracked
    constructor() {
        makeAutoObservable(this)
    }

    // Store function that loads the list of searched albums via Spotify
    // Accepts: string searchQuery
    getAlbums = async (searchQuery: string) => {
        // Modify the state within the action (state cannot be changed outside of actions)
        runInAction(() => {
            // Set the state of the search query
            this.isSearchLoading = true;
            this.searchQuery = searchQuery;
        });
        try {
            // Call the API agent function to get list of searched albums
            const response = await agent.Spotify.getAlbums(searchQuery);
            
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
                        // Push unique albums onto the array
                        uniqueAlbums.push(album);
                    }
                });
                //Filter out unique albums
                const albums = uniqueAlbums.filter((item: any) => item.albumType === "album");

                // Modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    // Set the albums data in the global search store state
                    this.searchAlbums = albums;
                    this.searchType = "album";
                    this.isSearchLoading = false;
                })
                
                return response;
            }            
        } catch (error) {
            throw error;
        }
    }

    // Store function that loads the list of searched tracks via Spotify
    // Accepts: string searchQuery
    getTracks = async (searchQuery: string) => {
        // Modify the state within the action (state cannot be changed outside of actions)
        runInAction(() => {
            // Set the state of the search query
            this.isSearchLoading = true;
            this.searchQuery = searchQuery;
        });
        try {
            // Call the API agent function to get list of searched tracks
            const response = await agent.Spotify.getTracks(searchQuery);

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
                        // Push unique tracks onto the array
                        uniqueTracks.push(track);
                    }
                });
    
                // Modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    // Set the tracks data in the global search store state
                    this.searchTracks = uniqueTracks;
                    this.searchType = "track";
                    this.isSearchLoading = false;
                })
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}