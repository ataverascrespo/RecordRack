import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import agent from "../api/serviceAgent";
import { store } from "./store";
import { router } from "../router/Routes";

// User data store class
export default class ProfileStore {
    viewedUser: User | undefined = undefined;
    loadingViewedUser = false;
    uploadingPhoto = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isCurrentUser() {
        // If the user is logged in and the viewed user is the logged in user, there's no need to re-fetch user data
        // Rather, just set the viewed user as the logged in user
        if (store.userStore.user && this.viewedUser) {
            return store.userStore.user.userName === this.viewedUser.userName;
        }
        return false;
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
            runInAction(() => {
                this.loadingViewedUser = false;
            });
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

    uploadProfilePhoto = async (file: File) => {
        this.uploadingPhoto = true; 

        //If the user already has a profile picture, delete the prev one before continuing
        if (this.viewedUser?.imageURL && this.viewedUser?.imageID) {
            this.deleteProfilePhoto(this.viewedUser.imageID)
        }
        try {
            const response = await agent.Users.uploadPhoto(file);
            if (response.data.success === true) {
                router.navigate(0)
                runInAction(() => {
                    this.uploadingPhoto = false;
                    if (store.userStore.user) {
                        store.userStore.user.imageURL = response.data.data.imageURL;
                        store.userStore.user.imageID = response.data.data.imageID;
                    }
                });
            }
            return response.data;
        } catch (error) {
            runInAction(() => {
                this.uploadingPhoto = false;
            });
        }
    }

    deleteProfilePhoto = async (id: string) => {
        try {
            await agent.Users.deletePhoto(id);
        } catch (error) {
            throw (error);
        }
    }
}