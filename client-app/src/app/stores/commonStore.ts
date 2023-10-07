/**
 * Name: commonStore.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This is a domain store for the common functionalities across features. 
 *          The main responsibility of domain stores is to move as much logic and state out of the components as possible. 
*/

import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    // Define class properties
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;

    // Set this store as observable.
    // In Mobx, making a class or property observable means that that object's state is globally stored, and changes are always tracked
    constructor() {
        makeAutoObservable(this);
        
        //Create a reaction with local storage side effects for the observable token
        reaction(
            () => this.token, 
            token => {
                // If the token is not null, set the token. Else, remove the token
                if (token) {
                    localStorage.setItem('jwt', token);
                }
                else {
                    localStorage.removeItem('jwt');
                }
            }
        )
    }

    // Store function to set the token
    // Accepts: string or null Token
    setToken = (token: string | null) => {
        this.token = token;
    }

    // Store function to set the app as rendered in component view
    // Accepts: none
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}