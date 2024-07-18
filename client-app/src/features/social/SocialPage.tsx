/**
 * Name: SocialPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders and configures the parent display for searching the user accounts.
*/

import { observer } from "mobx-react-lite";
import { SocialForm } from "./SocialForm";
import { useStore } from "@/app/stores/store";
import SocialSearchResults from "./SocialSearchResults";
import Loading from "@/app/layout/Loading";

function SocialPage() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { searchedUsers, searchQuery } = profileStore;

    return (
        <div className="container">
            <div className="mt-48 flex flex-col justify-start gap-6 md:gap-12 items-start">

                <div className="flex flex-col gap-4 items-start">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">
                        Connect with friends
                    </h1>
                </div>

                {/* Render search Form component */}
                <SocialForm />

                {
                    profileStore.loadingSearchedUsers
                    // While users are loading, display a loading component
                        ? <Loading text={"Loading..."} height={"h-[40vh]"}></Loading>
                        : 
                    // When users have loaded, render the search results
                        <SocialSearchResults results={searchedUsers} query={searchQuery}/>
                }
                
            </div>
        </div>
    )
}

// Wrap component in observer so that it reacts to MobX state changes
export default observer(SocialPage)