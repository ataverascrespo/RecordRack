import { User } from "./user";

export interface ProfileUser {
    id: number;
    userName: string;
    imageURL: string;
    imageID: string;
    followersCount: number;
    followingCount: number;
}

//Create a new class that implements the profile interface
export class Profile implements ProfileUser {
    constructor(user: User) {
        this.id = user.id;
        this.userName = user.userName;
        this.imageURL = user.imageURL;
        this.imageID = user.imageID;
        this.followersCount = user.followersCount;
        this.followingCount = user.followingCount;
    }

    id: number;
    userName: string;
    imageURL: string;
    imageID: string;
    followersCount: number;
    followingCount: number;
}