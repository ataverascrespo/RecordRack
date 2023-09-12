import { makeAutoObservable } from "mobx";
import { User, UserLoginSchema, UserRegisterSchema } from "../models/user";
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

    login = async (creds: UserLoginSchema) => {
        try {
            const response = await agent.Account.login(creds);
            return (response);
        } catch (error) {
            return(error);
        }
    }

    register = async (creds: UserRegisterSchema) => {
        try {
            const response = await agent.Account.register(creds);
            return (response);
        } catch (error) {
            return(error);
        }
    }
}