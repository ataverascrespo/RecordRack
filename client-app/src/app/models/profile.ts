/**
 *     Name: profile.ts
 *     Written by: Alex Taveras-Crespo
 * 
 * Purpose: This file contains the interface/class definitions for Profile related models, and defines their types and structures
 *          - ProfileUser interface
 *          - Profile class
*/

import { SavedRecord } from "./record";
import { User } from "./user";

// Define the ProfileUser interface and properties
export interface ProfileUser {
    id: number;
    userName: string;
    imageURL: string;
    imageID: string;
    following: boolean;
    followersCount: number;
    followingCount: number;
}

export interface ProfileUserNotification {
    type: string
    userName: string
    time: string
    albumID: string
    album: SavedRecord;
    user: User;
}

//Create a new class that implements the profile interface
export class Profile implements ProfileUser {
    constructor(user: User) {
        this.id = user.id;
        this.userName = user.userName;
        this.imageURL = user.imageURL;
        this.imageID = user.imageID;
        this.following = user.following;
        this.followersCount = user.followersCount;
        this.followingCount = user.followingCount;
    }

    id: number;
    userName: string;
    imageURL: string;
    imageID: string;
    following: boolean;
    followersCount: number;
    followingCount: number;
}