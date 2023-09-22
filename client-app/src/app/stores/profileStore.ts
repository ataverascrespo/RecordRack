import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import agent from "../api/serviceAgent";

// User data store class
export default class ProfileStore {
    viewedUser: User | undefined = undefined;
    loadingViewedUser = false;

    constructor() {
        makeAutoObservable(this)
    }

    getViewedUser = async (userName: string) => {
        this.loadingViewedUser = true;
        try {
            const response = await agent.Users.getUserByName(userName);
            const viewedUser: User = response.data;
            runInAction(() => {
                this.viewedUser = viewedUser
                this.loadingViewedUser = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    setViewedUser = (user: User) => {
        this.viewedUser = user;
    }

    getProfilePhoto = () => {
        if (this.viewedUser?.imageURL) {
            return this.viewedUser?.imageURL;
        } else {
            return 'https://res.cloudinary.com/dlwfuryyz/image/upload/v1695305498/album-api/jzbiw85pakr4amttznuq.jpg';
        }
    }

    setProfilePhoto = async () => {
        
    }
}