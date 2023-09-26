import { User } from "./user";

export interface ProfileUser {
    id: number;
    userName: string;
    imageURL: string;
    imageID: string;
}

//Create a new class that implements the profile interface
export class Profile implements ProfileUser {
    constructor(user: User) {
        this.id = user.id;
        this.userName = user.userName;
        this.imageURL = user.imageURL;
        this.imageID = user.imageID;
    }

    id: number;
    userName: string;
    imageURL: string;
    imageID: string;
}