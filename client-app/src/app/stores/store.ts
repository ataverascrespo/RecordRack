import { createContext, useContext } from "react";
import SearchStore from "./searchStore";

// Create an interface to store all of the app's global states
interface Store {
    searchStore: SearchStore
}

export const store: Store = {
    // Create a new instance of the search store
    searchStore: new SearchStore()
}

// Create the app context using store interface
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}