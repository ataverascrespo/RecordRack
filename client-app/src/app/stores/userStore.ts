import { makeAutoObservable } from "mobx";
import { User, UserLogin, UserRegister } from "../models/user";
import agent from "../api/serviceAgent";

// User data store class
export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserLogin) => {
        try {
            const response = await agent.Account.login(creds);
            return (response);
        } catch (error) {
            return(error);
        }
    }

    register = async (creds: UserRegister) => {
        try {
            const response = await agent.Account.register(creds);
            return (response);
        } catch (error) {
            return(error);
        }
    }


}