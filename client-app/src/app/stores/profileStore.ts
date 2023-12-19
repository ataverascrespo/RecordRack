/**
 * Name: profileStore.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This is a domain store responsible for the logic handled by the Profile feature of the app.
 *          The main responsibility of domain stores is to move as much logic and state out of the components as possible. 
*/

import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/serviceAgent";
import { store } from "./store";
import { router } from "../router/Routes";
import { ProfileUser } from "../models/profile";

// Profile data store class
export default class ProfileStore {

    // Define the class properties
    viewedUser: ProfileUser | undefined = undefined;
    loadingViewedUser = false;
    uploadingPhoto = false;
    viewedUserFollowers: ProfileUser[] | undefined = undefined;
    viewedUserFollowing: ProfileUser[] | undefined = undefined;
    viewedUserFollowersCount: number = 0;
    viewedUserFollowingCount: number = 0;
    searchedUsers: ProfileUser[] = [];
    searchQuery: string = "";
    loadingSearchedUsers = false;

    // Set this store as observable.
    // In Mobx, making a class or property observable means that that object's state is globally stored, and changes are always tracked
    constructor() {
        makeAutoObservable(this)
    }

    // Store function that evaluates if the user is logged in and the viewed user is the logged in user
    get isCurrentUser() {
        if (store.userStore.user && this.viewedUser) {
            return store.userStore.user.userName === this.viewedUser.userName;
        }
        return false;
    }

    // Store function to fetch and set the viewed user profile
    // Accepts: string userName
    getViewedUser = async (userName: string) => {
        this.loadingViewedUser = true;
        try {
            // Call the API agent function to get user by method param userName. 
            const response = await agent.Users.getUserByName(userName);
            const viewedUser: ProfileUser = response.data;

            // Modify the state within the action (state cannot be changed outside of actions)
            runInAction(() => {
                // Set the viewed user profile to the returned ProfileUser model from the API agent
                this.viewedUser = viewedUser;
                this.loadingViewedUser = false;
                //Reset the relevant fields when the app opens a new viewed user profile
                store.recordStore.savedRecords = [];
                store.recordStore.savedRecordsSortOrder = "asc";
                store.recordStore.savedRecordsSortType = "album";
                store.recordStore.savedRecordsSearchQuery = ""
                
                this.viewedUserFollowersCount = viewedUser.followersCount;
                this.viewedUserFollowingCount = viewedUser.followingCount;
                // Initialize these fields as empty as they are not returned, but we need them to be ready for retrieval 
                this.viewedUserFollowers = [];
                this.viewedUserFollowing = [];    
            });
            return response;
        } catch (error) {
            runInAction(() => {
                this.loadingViewedUser = false;
            });
            throw (error);
        }
    }

    // Store function to fetch the viewed user's profile picture
    // Accepts: none
    getProfilePhoto = () => {
        // If the viewed user has uploaded a profile photo, return it
        // Otherwise, return the default profile photo stored in Cloudinary
        if (this.viewedUser?.imageURL) {
            return this.viewedUser?.imageURL;
        } else {
            return 'https://res.cloudinary.com/dlwfuryyz/image/upload/v1695305498/album-api/jzbiw85pakr4amttznuq.jpg';
        }
    }

    // Store function to upload a profile picture for the user profile into the Cloudinary bucket
    // Accepts: File model
    uploadProfilePhoto = async (file: File) => {
        this.uploadingPhoto = true; 

        //If the user already has a profile picture, call this store's delete method to delete the existing one
        if (this.viewedUser?.imageURL && this.viewedUser?.imageID) {
            this.deleteProfilePhoto(this.viewedUser.imageID)
        }
        try {
            // Call the API agent function to Post a user photo
            const response = await agent.Users.uploadPhoto(file);
            if (response.data.success === true) {
                // Refresh the page
                router.navigate(0)

                // Modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    this.uploadingPhoto = false;
                    if (store.userStore.user) {
                        // If the userStore user prop is not null, set their imageURL and imageID to the uploaded image
                        store.userStore.user.imageURL = response.data.data.imageURL;
                        store.userStore.user.imageID = response.data.data.imageID;
                    }
                });
            }
            return response.data;
        } catch (error) {
            // Modify the state within the action (state cannot be changed outside of actions)
            runInAction(() => {
                this.uploadingPhoto = false;
            });
            throw (error);
        }
    }

    // Store function to delete a profile photo from Cloudinary bucket
    // Accepts: string photoID
    deleteProfilePhoto = async (photoID: string) => {
        try {
            // Call the API agent function to delete existing photo from bucket
            await agent.Users.deletePhoto(photoID);
        } catch (error) {
            throw (error);
        }
    }

    // Store function to follow another user
    // Accepts: number userID
    followUser = async (userID: number) => {
        try {
            // Call the API agent function to follow user based on passed ID param
            const response = await agent.Users.follow(userID);
            if (response.success == true) {
                const user: ProfileUser = response.data;
                // Modify the state within the action (state cannot be changed outside of actions)
                // Modify the viewed user state, which triggers the observable to display the updated follow count.
                runInAction(() => {
                    this.viewedUserFollowersCount = user.followersCount;
                });
            }
            return response;
        } catch (error) {
            throw (error);
        }
    }

    // Store function to retrieve the list of users following a specified user
    // Accepts: number userID
    getFollowers = async (userID: number) => {
        try {
            // Call the API agent function to get user's followers
            const response = await agent.Users.getFollowers(userID);
            if (response.success === true) {
                // Modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    // Set the users followers list
                    this.viewedUserFollowers = response.data;
                });
            }
            return response;
        } catch (error) {
            throw (error);
        }
    }

    // Store function to retrieve the list of users followed by a specified user
    // Accepts: number userID
    getFollowing = async (userID: number) => {
        try {
            // Call the API agent function to get user's followers
            const response = await agent.Users.getFollowing(userID);
            if (response.success === true) {
                // Modify the state within the action (state cannot be changed outside of actions)
                runInAction(() => {
                    // Set the users following list
                    this.viewedUserFollowing = response.data;
                });
            }
            return response;
        } catch (error) {
            throw (error);
        }
    }

    // Store function to search the users
    // Accepts: string searchQuery
    searchUsers = async (searchQuery: string) => {
        this.loadingSearchedUsers = true;

        if (searchQuery.length === 0) {
            // Modify the state within the action (state cannot be changed outside of actions)
            runInAction(() => {
                // Set search as empty
                this.searchedUsers = [];
                this.loadingSearchedUsers = false;
            });
        }

        //if the search params are 4 or greater, start searching
        //This is just some performance optimization. Usernames are a min of 6 strings so there is no need to search a query less than 4 chars
        else if (searchQuery.length >= 4) {
            try {
                // Call the API agent function to return a list of users via the specified input
                const response = await agent.Users.searchUsers(searchQuery);

                if (response.success === true) {
                    // Modify the state within the action (state cannot be changed outside of actions)
                    runInAction(() => {
                        // Save the state of the searched users and search query
                        this.searchedUsers = response.data;
                        this.searchQuery = searchQuery;
                        this.loadingSearchedUsers = false;
                    });
                } else {
                    runInAction(() => {
                        // Set search as empty
                        this.searchedUsers = [];
                        this.loadingSearchedUsers = false;
                    });
                }
                return response;
            } catch (error) {
                console.log(error);
            }
        }
    }
}