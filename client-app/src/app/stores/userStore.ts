/**
 * Name: userStore.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This is a domain store responsible for the logic handled by the Users feature of the app.
 *          The main responsibility of domain stores is to move as much logic and state out of the components as possible. 
*/

import { makeAutoObservable, runInAction } from "mobx";
import { User, UserChangePassword, UserForgotPassword, UserLogin, UserRegister, UserResetPassword, UserVerify } from "../models/user";
import agent from "../api/serviceAgent";
import { store } from "./store";
import { router } from "../router/Routes";

// User data store class
export default class UserStore {
    
    //Define the default class property
    user: User | null = null;

    // Set this store as observable.
    // In Mobx, making a class or property observable means that that object's state is globally stored, and changes are always tracked
    constructor() {
        makeAutoObservable(this)
    }

    // Store getter function that returns the boolean value of user's login status
    get isLoggedIn() {
        /*
            Use a double negation because that coerces the User object (of type User or null) into a boolean. To demonstrate:
            
            If user is of type User, it is not null so the object is truthy. Double negation coerces the object to boolean 'true'
            If user is of type null, the object is falsy. Double negation coerces the object to boolean 'false'
        */
        return !!this.user;
    }

    // Store function that gets the current user
    // Accepts: UserChangePassword creds
    getUser = async () => {
        try {
             // Call the API agent function to get the current logged in user
            const response = await agent.Users.getCurrentUser();
            const user: User = response.data;
            
            // Modify the state within the action (state cannot be changed outside of actions)
            // Set the current user in global statee
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    // Store function that logs the user in with the passed credentials
    // Accepts: UserLogin creds
    login = async (creds: UserLogin) => {
        try {
            // Call the API agent function to log user in with specified credentials
            const response = await agent.Account.login(creds);

            //Store the JWT upon sign in and update the user object
            store.commonStore.setToken(response.data.token)

            // Modify the state within the action (state cannot be changed outside of actions)
            // Set the user in global state
            runInAction(() => this.user = response.data)
            
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function that logs the user out
    // Accepts: none
    logout = async () => {
        try {
            // Call the API agent function to log user out
            const response = await agent.Account.logout();

            //If the REST endpoint succeeded, log out
            if (response.success === true) {
                //Set the browser token and user object global state within the action to null
                store.commonStore.setToken(null);
                runInAction(() => this.user = null);
                //Navigate to home page
                router.navigate('/')
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function that registers a new user to the app with the passed credentials
    // Accepts: UserRegister creds
    register = async (creds: UserRegister) => {
        try {
            // Call the API agent function to register user with specified credentials
            const response = await agent.Account.register(creds);

            //If the registration succeeded, navigate to verify page
            if (response.success === true) {
                router.navigate('/accounts/verify')
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function that verifies a new user account
    // Accepts: UserVerify creds
    verify = async (creds: UserVerify) => {
        try {
            // Call the API agent function to verify user
            const response = await agent.Account.verify(creds);
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function that begins the back-end process of resetting password
    // Accepts: UserForgotPassword creds
    forgotPassword = async (creds: UserForgotPassword) => {
        try {
            // Call the API agent function to set password as forgotten
            const response = await agent.Account.forgotPassword(creds);
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function that resets the password for the current user
    // Accepts: UserResetPassword creds
    resetPassword = async (creds: UserResetPassword) => {
        try {
            // Call the API agent function to reset password
            const response = await agent.Account.resetPassword(creds);

            //If the API call succeeded, navigate to login page
            if (response.success === true) {
                router.navigate('/accounts/login')
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }

    // Store function that changes the password for the current user
    // Accepts: UserChangePassword creds
    changePassword = async (creds: UserChangePassword) => {
        try {
            // Call the API agent function to change password
            const response = await agent.Account.changePassword(creds);
            
            //If the API call succeeded, log user out
            if (response.success === true) {
                this.logout();
            }
            return (response);
        } catch (error) {
            return (error);
        }
    }
}