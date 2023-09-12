import { createContext, useContext } from "react";
import SearchStore from "./searchStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

// Create an interface to store all of the app's global states
interface Store {
    searchStore: SearchStore;
    userStore: UserStore;
    commonStore: CommonStore;
}

export const store: Store = {
    // Create a new instance of the search store
    searchStore: new SearchStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
}

// Create the app context using store interface
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}