/**
 * Name: store.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This is the default domain store. It handles the interfaces and instantiation of the rest of the domain stores found in the app.
 *          The main responsibility of domain stores is to move as much logic and state out of the components as possible. 
*/

import { createContext, useContext } from "react";
import SearchStore from "./searchStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import RecordStore from "./recordStore";
import ProfileStore from "./profileStore";

// Create an interface to store all of the app's global states
interface Store {
    searchStore: SearchStore;
    userStore: UserStore;
    commonStore: CommonStore;
    recordStore: RecordStore;
    profileStore: ProfileStore;
}

// Exported module that creates new instances of each of the application's domain stores
export const store: Store = {
    searchStore: new SearchStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    recordStore: new RecordStore(),
    profileStore: new ProfileStore(),
}

// Create the app context using store interface
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}