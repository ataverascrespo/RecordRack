import {makeAutoObservable} from "mobx";
import { Album } from "../models/album";

// Spotify search data store class
export default class SearchStore {
    searchAlbums: Album[] = [];

    constructor() { 
        makeAutoObservable(this)
    }

    setSearchAlbums = (albums: Album[]) => {
        this.searchAlbums = albums;
    }
}