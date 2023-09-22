import { makeAutoObservable, runInAction } from "mobx";
import { User, UserForgotPassword, UserLogin, UserRegister, UserResetPassword, UserVerify } from "../models/user";
import agent from "../api/serviceAgent";
import { store } from "./store";
import { router } from "../router/Routes";

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

            //Store the JWT upon sign in and update the user object
            store.commonStore.setToken(response.data.token)
            runInAction(() => this.user = response.data)

            //If the API call succeeded, navigate to rack page
            if (response.success === true) {
                router.navigate(`/${this.user!.userName}/profile`)
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/')
    }

    register = async (creds: UserRegister) => {
        try {
            const response = await agent.Account.register(creds);
            //If the API call succeeded, navigate to verify page
            if (response.success === true) {
                router.navigate('/verify')
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    verify = async (creds: UserVerify) => {
        try {
            const response = await agent.Account.verify(creds);
            return (response);
        } catch (error) {
            return (error);
        }
    }

    forgotPassword = async (creds: UserForgotPassword) => {
        try {
            const response = await agent.Account.forgotPassword(creds);
            return (response);
        } catch (error) {
            return (error);
        }
    }

    resetPassword = async (creds: UserResetPassword) => {
        try {
            const response = await agent.Account.resetPassword(creds);
            //If the API call succeeded, navigate to rack page
            if (response.success === true) {
                router.navigate('/login')
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // USER/PROFILE RELATED FUNCTIONS
    getUser = async () => {
        try {
            const response = await agent.Users.getCurrentUser();
            const user: User = response.data;
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

      //This is currently not being used. Don't wanna delete yet though
    //
    // refresh = async () => {
    //     try {
    //         const response = await agent.Account.refresh();
    //         store.commonStore.setToken(response.data)
    //     } catch(error) {
    //         throw (error);
    //     }
    // }
}