import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/serviceAgent";
import { store } from "./store";
import { router } from "../router/Routes";
import { SavedRecord } from "../models/savedRecord";

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

    // getRecordByID = async (ID: number) => {
    //     try {
    //         const record = this.savedRecords[ID];
    //         console.log(this.savedRecords)
           
    //     } catch (error) { 
    //         throw(error)
    //     }
    // }

}