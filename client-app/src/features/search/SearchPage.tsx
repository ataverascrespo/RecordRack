import { useEffect, useState } from "react";
import axios from 'axios';
import { ThemeProvider } from "@/components/theme-provider"
import { SearchForm } from "@/features/search/SearchForm";
import { useStore } from "@/app/stores/store";
import SearchResults from "./SearchResultsAlbum";
import { observer } from "mobx-react-lite";
import SearchResultsTrack from "./SearchResultsTrack";





//Spotify Client ID
const CLIENT_ID = "6b6f9f90098c40469273168487c49eb7";
//Secret ID to be retrieved with lambda function
const CLIENT_SECRET = 'ccff73d29e974becbb028bb7a547c45f';

function SearchPage() {

    const [accessToken, setAccessToken] = useState("");

    // Access the global Mobx stores
    const { searchStore } = useStore();

    useEffect(() => {
        // Encode the Client ID and Client Secret for Basic Authentication
        const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

        // Request body
        const data = 'grant_type=client_credentials';

        // Make a POST request to get the access token
        axios.post('https://accounts.spotify.com/api/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`,
            }
        })
            .then((response) => {
                setAccessToken(response.data.access_token);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="container">
                <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-12 items-start container">

                    <div className="flex flex-col gap-4 items-start">
                        <h1 className="text-3xl md:text-6xl font-bold">Add a new record to your collection</h1>
                        <div className="flex flex-row gap-2 items-center">
                            <h2 className="font-semibold text-base text-neutral-300 dark:text-neutral-700">Powered by</h2>
                            <img className="bg-light dark:bg-dark" src="./src/assets/spotify.svg" draggable="false"></img>
                        </div>
                    </div>

                    {/* Call form component, pass props */}
                    <SearchForm accessToken={accessToken}></SearchForm>
                    
                    {/* Retrieve global state store props and pass them, based on the search type that was saved most recently*/}
                    {searchStore.searchType === "album" ? (
                        <SearchResults results={searchStore.searchAlbums}></SearchResults>
                    ) : (
                        <SearchResultsTrack results={searchStore.searchTracks}></SearchResultsTrack>
                    )}

                </div>
            </div>
        </ThemeProvider>
    )
}

export default observer(SearchPage)