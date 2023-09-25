import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/serviceAgent";
import { AddRecord, SavedRecord, UpdateRecord } from "../models/record";

// User data store class
export default class RecordStore {
    savedRecords: SavedRecord[] = [];
    selectedRecord: SavedRecord | undefined = undefined;
    loadingSelectedRecord = false;

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

    loadRecordsForUser = async (userID: number) => {
        try {
            const response = await agent.Records.getListForUser(userID);
            const records: SavedRecord[] = response.data;
            console.log(records);
            runInAction(() => this.savedRecords = records);
        } catch (error) { 
            throw(error)
        }
    }

    loadRecord = async (id: number) => {
        this.loadingSelectedRecord = true;
        let record = this.getRecord(id);
        if (record) {
            runInAction(() => {
                this.selectedRecord = record;
                this.loadingSelectedRecord = false;
            });
            return record;
        }
        else {
            try {
                const response = await agent.Records.getSingle(id);
                record = response.data;
                runInAction(() => {
                    this.selectedRecord = record;
                    this.loadingSelectedRecord = false;
                });
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
            return (response);
        } catch (error) {
            return(error);
        }
    }

    updateRecord = async (record: UpdateRecord) => {
        try {
            const response = await agent.Records.update(record);
            if (response.data) {
                runInAction(() => {
                    this.selectedRecord = response.data;
                    this.loadingSelectedRecord = false;
                });
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    deleteRecord = async (id: number) => {
        try {
            await agent.Records.delete(id);
            this.unselectRecord();
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