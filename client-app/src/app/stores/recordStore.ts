import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/serviceAgent";
import { router } from "../router/Routes";
import { AddRecord, SavedRecord } from "../models/record";

// User data store class
export default class RecordStore {
    savedRecords: SavedRecord[] = [];
    selectedRecord: SavedRecord | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    loadRecords = async () => {
        try {
            const response = await agent.Records.getList();
            const records: SavedRecord[] = response.data;
            runInAction(() => this.savedRecords = records);
            return (records);
        } catch (error) { 
            throw(error)
        }
    }

    loadRecord = async (id: number) => {
        let record = this.getRecord(id);
        console.log(record)
        if (record) {
            this.selectedRecord = record;
            return record;
        }
        else {
            try {
                record = await agent.Records.getSingle(id);
                runInAction(() => this.selectedRecord = record);
                console.log(record);
                return record;
            } catch (error) {
                throw(error);
            }
        }
    }

    getRecord = (id: number) => {
        return this.savedRecords.find(a => a.id === id)
    }    

    selectRecord = (id: number) => {
        this.selectedRecord = this.savedRecords.find(a => a.id === id)
    }

    unselectRecord = () => {
        this.selectedRecord = undefined;
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