"use client"
import * as z from "zod"
import axios from "axios"
import { useForm } from "react-hook-form"

//Component imports
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

//Model imports
import { useStore } from "@/app/stores/store"
import { SpotifyAlbum } from "@/app/models/spotifyAlbum"
import { SpotifyTrack } from "@/app/models/spotifyTrack"


// Define component props
interface Props {
  accessToken: string;
}

// Form schema for search validation
const FormSchema = z.object({
  album: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  type: z.string()
})

export function SearchForm({ accessToken }: Props) {
  // Access the global Mobx stores
  const { searchStore } = useStore();

  // Define the form and form type
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      album: "",
      type: "album"
    },
  })

  // Define form submission handler for album
  function onSubmitAlbum(data: z.infer<typeof FormSchema>) {
    axios.get(`https://api.spotify.com/v1/search?q=${data.album}&type=album&market=ES&limit=40`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((response) => {
      
        // Create an array of unique albums and a set of seen albums
        // this allows me to filter out albums that are duplicates (i.e explicit/non-explicit, re-releases)
        const uniqueAlbums: any[] = [];
        const seenAlbums = new Set();

        response.data.albums.items.forEach((album: SpotifyAlbum) => {
          // Create an identifier for each returned album
          const albumIdentifier = `${album.name} - ${album.artists[0].name}`;

          if (!seenAlbums.has(albumIdentifier)) {
            seenAlbums.add(albumIdentifier);
            uniqueAlbums.push(album);
          }
        });
        const albums = uniqueAlbums.filter((item: any) => item.album_type === "album");
        // Set the albums data in the global search store state
        searchStore.setSearchAlbums(albums);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Define form submission handler for track
  function onSubmitTrack(data: z.infer<typeof FormSchema>) {
    axios.get(`https://api.spotify.com/v1/search?q=${data.album}&type=track&market=ES&limit=40`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        
        // Create an array of unique tracks and a set of seen tracks
        // this allows me to filter out tracks that are duplicates (i.e explicit/non-explicit, re-releases)
        const uniqueTracks: any[] = [];
        const seenTracks = new Set();

        response.data.tracks.items.forEach((track: SpotifyTrack) => {
          // Create an identifier for each returned track
          const trackIdentifier = `${track.name} - ${track.album.artists[0].name}`;
          if (!seenTracks.has(trackIdentifier)) {
            seenTracks.add(trackIdentifier);
            uniqueTracks.push(track);
          }
        });
        // Set the tracks data in the global search store state
        searchStore.setSearchTracks(uniqueTracks);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
      <div className="w-2/3 h-full flex flex-col items-center justify-center">
        <Tabs className="w-full space-y-6" defaultValue="album">
          <TabsList>
            <TabsTrigger className="w-[150px]" value="album">Albums</TabsTrigger>
            <TabsTrigger className="w-[150px]" value="track">Tracks</TabsTrigger>
          </TabsList>
          <TabsContent value="album" className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitAlbum)} className="w-full md:w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="album"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-row gap-4 items-center">
                          <Input placeholder="Enter the name of an album or an artist..." {...field} />
                          <Button type="submit" size="lg"><p className="text-base">Search</p></Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )} />

              </form>
            </Form>

          </TabsContent>
          <TabsContent value="track">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitTrack)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="album"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-row gap-4 items-center">
                          <Input placeholder="Enter the name of an individual track or an artist..." {...field} />
                          <Button type="submit" size="lg"><p className="text-base">Search</p></Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )} />
              </form>
            </Form>
          </TabsContent>
        </Tabs>
    </div>
  )
}