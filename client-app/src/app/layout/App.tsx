import { useEffect, useState } from "react";
import axios from 'axios';
import { Album } from "../models/album";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider"

"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SearchForm } from "@/components/search-form";

 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


//Spotify Client ID
const CLIENT_ID = "6b6f9f90098c40469273168487c49eb7";
//Secret ID to be retrieved with lambda function
const CLIENT_SECRET = 'ccff73d29e974becbb028bb7a547c45f';

function App() {

  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);

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


  const getSearch = () => {
    var query = "J Cole"

    axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album&market=ES`,  {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      
        const albums = response.data.albums.items.filter((item: any) => item.album_type === "album");
        setAlbums(albums);
        console.log(albums);
      //   setAlbums(response.data.tracks.items);
      //   console.log(albums);
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="App">
        <Navbar></Navbar>

        <div className="h-[50vh] flex flex-col justify-center gap-12 items-start container">
          
          <div className="flex flex-col gap-4 items-start">
              <h1 className="text-6xl font-bold">Add a new record to your collection</h1>
              <div className="flex flex-row gap-2 items-center">
                <h2 className="font-semibold text-base text-neutral-300 dark:text-neutral-700">Powered by</h2>
                <img className="bg-light dark:bg-dark" src="./src/assets/spotify.svg" draggable="false"></img>
              </div>          
          </div>
          
          <SearchForm></SearchForm>
        </div>


        {/* <button className="text-3xl font-bold" onClick={getSearch}>Call API</button>
          <ul>
            {albums.map(album => (
              <li key={album.id}>
                {album.name} -{album.artists.map(artist => (
                  " " + artist.name
                ))}
              </li>
            ))}
          </ul> */}
      </div>
    </ThemeProvider>
  )
}

export default App
