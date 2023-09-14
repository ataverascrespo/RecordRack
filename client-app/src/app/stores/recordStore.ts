import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/serviceAgent";
import { store } from "./store";
import { router } from "../router/Routes";
import { AddRecord, SavedRecord } from "../models/record";
import { SpotifyAlbum } from "../models/spotifyAlbum";

// User data store class
export default class RecordStore {
    savedRecords: SavedRecord[] = [];
    selectedRecord: SavedRecord | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    loadRecords = async () => {
        try {
            const response = await agent.Records.list();
            const records: SavedRecord[] = response.data;
            runInAction(() => this.savedRecords = records);
            return (records);
        } catch (error) { 
            throw(error)
        }
    }

    addRecord = async (record: AddRecord) => {
        try {
            const response = await agent.Records.add(record);
            //If the API call succeeded, re-navigate to search page to close dialog modal
            if (response.success === true) {
                router.navigate('/search')
            }
            return (response);
        } catch (error) {
            return(error);
        }
    }

    // getRecordByID = async (ID: number) => {
    //     try {
    //         const record = this.savedRecords[ID];
    //         console.log(this.savedRecords)
           
    //     } catch (error) { 
    //         throw(error)
    //     }
    // }

}