/**
 * Name: recordStore.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This is a domain store responsible for the logic handled by the Records feature of the app.
 *          The main responsibility of domain stores is to move as much logic and state out of the components as possible. 
*/

import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/serviceAgent";
import { AddRecord, SavedRecord, UpdateRecord } from "../models/record";
import { store } from "./store";
import { Profile, ProfileUser } from "../models/profile";
import { User } from "../models/user";

// Record data store class
export default class RecordStore {

    // Define the default class properties
    savedRecords: SavedRecord[] = [];
    loadingRecords = false;
    savedRecordsSortType: string = "album";
    savedRecordsSortOrder: string = "asc";
    savedRecordsSearchQuery: string = "";
    selectedRecord: SavedRecord | undefined = undefined;
    loadingSelectedRecord = false;
    isSelectedRecordLiked = false;

    // Set this store as observable.
    // In Mobx, making a class or property observable means that that object's state is globally stored, and changes are always tracked
    constructor() {
        makeAutoObservable(this)
    }

    // Store function that loads the records for the current user
    // Accepts: none
    loadRecords = async () => {
        this.loadingRecords = true;
        try {
            // Call the API agent function to get list of records for current user
            const response = await agent.Records.getList();
            const records: SavedRecord[] = response.data;
            console.log(records);
            if (records != undefined) {
                // Modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    // Set the records, as well as the sort order and displayed type
                    // Filter the records such that private records are not shown unless the retrieved list is of the current user
                    this.savedRecords = records
                        .filter((record) => !record.isPrivate || (store.profileStore.isCurrentUser && record.isPrivate))
                    this.sortRecordsOrder(this.savedRecordsSortOrder)
                    this.sortRecordsType(this.savedRecordsSortType);
                });
            }
            return (response);
        } catch (error) {
            throw (error)
        }
    }

    // Store function that loads the records for a specified user
    // Accepts: number userID
    loadRecordsForUser = async (userID: number) => {
        this.loadingRecords = true;
        try {
            // Call the API agent function to get list of records for current user
            const response = await agent.Records.getListForUser(userID);
            const records: SavedRecord[] = response.data;
            if (records != undefined) {
                // Modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    // Set the records, as well as the sort order and displayed type
                    // Filter the records such that private records are not shown unless the retrieved list is of the current user
                    this.savedRecords = records
                        .filter((record) => !record.isPrivate || (store.profileStore.isCurrentUser && record.isPrivate))
                    this.sortRecordsOrder(this.savedRecordsSortOrder)
                    this.sortRecordsType(this.savedRecordsSortType);
                });
            }
            return (response);
        } catch (error) {
            throw (error)
        }
    }

    // Store function that accomplishes a custom sort to sort the records by date added
    // Accepts: string sortOrder
    sortRecordsOrder(sortOrder: string): SavedRecord[] {
        // Modify the state within the action (state cannot be changed outside of actions)
        runInAction(() => {
            // Save state of the sort order
            this.savedRecordsSortOrder = sortOrder;
        });
        return this.savedRecords.sort((a, b) => {
            if (sortOrder === "asc") {
                // If sort order is ascending, compare Date objects value to accordingly sort
                var aTime = new Date(a.dateAdded);
                var bTime = new Date(b.dateAdded);
                return aTime.getTime() - bTime.getTime()
            } else if (sortOrder === "desc") {
                // If sort order is descending, compare Date objects value to accordingly sort
                var bTime = new Date(b.dateAdded);
                var aTime = new Date(a.dateAdded);
                return bTime.getTime() - aTime.getTime()
            } else {
                throw new Error("Invalid sortOrder");
            }
        });
    }

    // Store function that sets the displayed record filter type
    // Accepts: string sortType
    sortRecordsType(sortType: string) {
        // Modify the state within the action (state cannot be changed outside of actions)
        runInAction(() => {
            // Save the state of the filtered record type
            this.savedRecordsSortType = sortType;
            this.loadingRecords = false;
        });
    }

    // Store function that sets the search query of records
    // Accepts: string searchQuery
    setRecordsSearchQuery(searchQuery: string) {
        // Modify the state within the action (state cannot be changed outside of actions)
        runInAction(() => {
            // Save the state of the search query
            this.savedRecordsSearchQuery = searchQuery;
        });
    }

    // Store function that fetches the properties of a specified Record
    // Accepts: string id
    loadRecord = async (id: string) => {
        this.loadingSelectedRecord = true;
        this.isSelectedRecordLiked = false;

        try {
            // Call the API agent function to get list of records for current user
            const response = await agent.Records.getSingle(id);
            const record = response.data;

            // Modify the state within the action (state cannot be changed outside of actions)
            runInAction(() => {
                // Save the state of the selected record
                this.selectedRecord = record;
                this.savedRecordsSortType = record!.albumType;
                this.loadingSelectedRecord = false;
            });
        } catch (error) {
            throw (error);
        }
    }

    // Store function that unselects a record (that was/will be selected in loadRecord function)
    // Accepts: none
    unselectRecord = () => {
        // Modify the state within the action (state cannot be changed outside of actions)
        // Unselect the record by setting the prop as undefined
        runInAction(() => this.selectedRecord = undefined);
    }

    // Store function to add a record to the current user's list of records
    // Accepts: AddRecord model request
    addRecord = async (request: AddRecord) => {
        try {
            // Call the API agent function to get list of records for current user
            const response = await agent.Records.add(request);
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function to update a record in the current user's list of records
    // Accepts: UpdateRecord model request
    updateRecord = async (request: UpdateRecord) => {
        try {
            // Call the API agent function to get list of records for current user
            const response = await agent.Records.update(request);
            const record: SavedRecord = response.data;
            if (record) {
                // If the record is not null, modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    // Set the state of the selected record to reload the page with persisted state change
                    this.selectedRecord = record;
                    this.loadingSelectedRecord = false;
                });
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function to delete a record in the current user's list of records
    // Accepts: string id
    deleteRecord = async (id: string) => {
        try {
            // Call the API agent function to get list of records for current user
            await agent.Records.delete(id);

            // Modify the state within the action (state cannot be changed outside of actions)
            // Unselect the now deleted record
            runInAction(() => this.unselectRecord());
        } catch (error) {
            return (error);
        }
    }

    // Store function to like a record 
    // Accepts: none
    likeRecord = async (user: User) => {
        try {
            // Call the API agent function to like a record, pass the current selected record's ID
            const response = await agent.Records.like(this.selectedRecord!.id);
            if (response.success === true) {
                this.handleRecordLike(user!)
            }
            return (response);
        } catch (error) {
            throw (error);
        }
    }

    // Store function to retrieve the list of users who have liked a specified record
    // Accepts: string recordID
    getRecordLikes = async (recordID: string) => {
        this.loadingSelectedRecord = true;
        try {
            // Call the API agent function to get the record likes for the passed ID
            const response = await agent.Records.getRecordLikes(recordID);
            if (response.success === true) {
                this.handleGetRecordLikes(response);
            }
            runInAction(() => this.loadingSelectedRecord = false);
            return (response);
        } catch (error) {
            runInAction(() => this.loadingSelectedRecord = false);
            throw (error);
        }
    }

    // Store function that handles the modification of global state after liking a record. 
    // Accepts: User model user
    handleRecordLike = (user: User) => {
        // Modify the state within the action (state cannot be changed outside of actions)
        runInAction(() => {
            // Check if the list of likes on the current selected record contains the current user ID
            if (this.selectedRecord?.likes.some(u => u.id === user?.id)) {
                //Remove the like from the array
                this.selectedRecord.likes =
                    this.selectedRecord?.likes.filter(u => u.id !== user?.id);
                this.isSelectedRecordLiked = false;
            }
            else {
                //Create a profile class object to save as a liked user, and push onto liked array
                const liked = new Profile(user!);
                this.selectedRecord?.likes.push(liked)
                this.isSelectedRecordLiked = true;
            }
        })
    }

    // Store function that handles the modification of global state after getting the likes for a given record
    // Accepts: User model user
    handleGetRecordLikes = (response: any) => {
        // Map the profiles returned in the response's data to objects of type ProfileUser (and properties)
        const profiles: ProfileUser[] = response.data.map((userData: any) => {
            return {
                id: userData.user.id,
                userName: userData.user.userName,
                imageURL: userData.user.imageURL,
                imageID: userData.user.imageID
            };
        });

        // Modify the state within the action (state cannot be changed outside of actions) to set the list of likes
        runInAction(() => this.selectedRecord!.likes = profiles);

        // Verify if the user has liked the current selected record, so we can display the proper information of that to the user
        if (this.selectedRecord?.likes.some(u => u.id === store.userStore.user?.id)) {
            runInAction(() => this.isSelectedRecordLiked = true);
        }
    }

    get isRecordLiked() {
        return this.isSelectedRecordLiked;
    }
}