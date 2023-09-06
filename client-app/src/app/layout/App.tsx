import { useEffect, useState } from "react";
import axios from 'axios';
import { Album } from "../models/album";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider"


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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <Navbar></Navbar>
        <button className="text-3xl font-bold" onClick={getSearch}>Call API</button>
          <ul>
            {albums.map(album => (
              <li key={album.id}>
                {album.name} -{album.artists.map(artist => (
                  " " + artist.name
                ))}
              </li>
            ))}
          </ul>
      </div>
    </ThemeProvider>
  )
}

export default App
