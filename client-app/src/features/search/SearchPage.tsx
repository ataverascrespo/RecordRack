/**
 * Name: SearchPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders and configures the parent display for the Spotify album/track search feature.
*/

import { SearchForm } from "@/features/search/SearchForm";
import { useStore } from "@/app/stores/store";
import SearchResults from "./SearchResultsAlbum";
import { observer } from "mobx-react-lite";
import SearchResultsTrack from "./SearchResultsTrack";
import Loading from "@/app/layout/Loading";

function SearchPage() {
    // Access the global Mobx stores
    const { searchStore } = useStore();

    return (
        <div className="container">
            <div className="h-full mt-48 flex flex-col justify-start gap-6 md:gap-12 items-start">

                <div className="flex flex-col gap-4 items-start">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">Add a new record to your collection</h1>
                    <div className="flex flex-row gap-2 items-center">
                        <h2 className="font-semibold text-xs sm:text-base text-neutral-300 dark:text-neutral-700">Powered by</h2>
                        <img className="bg-light dark:bg-dark" src="/assets/spotify.svg" draggable="false"></img>
                    </div>
                </div>

                {/* Call form component, pass props */}
                <SearchForm></SearchForm>

                {/* Retrieve global state store props and pass them, based on the search type that was executed most recently*/}
                {
                    searchStore.isSearchLoading
                        ? <Loading text={"Loading..."} height={"h-[40vh]"}></Loading>
                        : (
                            searchStore.searchType === "album" ? (
                                <SearchResults results={searchStore.searchAlbums}></SearchResults>
                            ) : (
                                <SearchResultsTrack results={searchStore.searchTracks}></SearchResultsTrack>
                            )
                        )
                }

            </div>
        </div>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(SearchPage)