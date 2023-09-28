import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/serviceAgent";
import { AddRecord, SavedRecord, UpdateRecord } from "../models/record";
import { store } from "./store";
import { Profile, ProfileUser } from "../models/profile";

// User data store class
export default class RecordStore {
    savedRecords: SavedRecord[] = [];
    selectedRecord: SavedRecord | undefined = undefined;
    loadingSelectedRecord = false;
    isSelectedRecordLiked = false;

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
            throw (error)
        }
    }

    loadRecordsForUser = async (userID: number) => {
        try {
            const response = await agent.Records.getListForUser(userID);
            const records: SavedRecord[] = response.data;
            runInAction(() => this.savedRecords = records);
        } catch (error) {
            throw (error)
        }
    }

    loadRecord = async (id: number) => {
        this.loadingSelectedRecord = true;
        this.isSelectedRecordLiked = false;

        let record = this.getRecord(id);
        if (record) {
            runInAction(() => {
                this.selectedRecord = record;
                store.profileStore.viewedUserRecordType = record!.albumType;
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
                    store.profileStore.viewedUserRecordType = record!.albumType;
                    this.loadingSelectedRecord = false;
                });
            } catch (error) {
                throw (error);
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

    addRecord = async (request: AddRecord) => {
        try {
            const response = await agent.Records.add(request);
            return (response);
        } catch (error) {
            return (error);
        }
    }

    updateRecord = async (request: UpdateRecord) => {
        try {
            const response = await agent.Records.update(request);
            const record: SavedRecord = response.data;
            if (record) {
                runInAction(() => {
                    this.selectedRecord = record;
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
            return (error);
        }
    }

    likeRecord = async () => {
        const user = store.userStore.user;
        try {
            const response = await agent.Records.like(this.selectedRecord!.id);
            if (response.success === true) {
                runInAction(() => {
                    if (this.selectedRecord?.likes.some(u => u.id === user?.id)) {
                        //Remove the like from the array
                        this.selectedRecord.likes =
                            this.selectedRecord?.likes.filter(u => u.id !== user?.id);
                        this.isSelectedRecordLiked = false;
                    }
                    else {
                        //Create a profile object to save as a like and push onto liked array
                        const liked = new Profile(user!);
                        this.selectedRecord?.likes.push(liked)
                        this.isSelectedRecordLiked = true;
                    }
                })
                return (response);
            }
        } catch (error) {
            throw (error);
        }
    }

    getRecordLikes = async (albumID: number) => {
        this.loadingSelectedRecord = true;
        try {
            const response = await agent.Records.getRecordLikes(albumID);
            if (response.success === true) {
                const profiles: ProfileUser[] = response.data.map((userData: any) => {
                    return {
                        id: userData.user.id,
                        userName: userData.user.userName,
                        imageURL: userData.user.imageURL,
                        imageID: userData.user.imageID
                    };
                });
                
                runInAction(() => this.selectedRecord!.likes = profiles);
                if (this.selectedRecord?.likes.some(u => u.id === store.userStore.user?.id)) {
                    runInAction(() => this.isSelectedRecordLiked = true);
                }
                runInAction(() => this.loadingSelectedRecord = false);
                return (response);
            }
        } catch (error) {
            throw (error);
        }
    }

    get isRecordLiked() {
        return this.isSelectedRecordLiked;
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