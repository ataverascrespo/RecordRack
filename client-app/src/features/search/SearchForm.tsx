"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"
import { Album } from "@/app/models/album"

import { Card,  CardContent, CardDescription,  CardFooter, CardHeader,  CardTitle, } from "@/components/ui/card"

// Define component props
interface Props {
  accessToken: string;
}

// Form schema for search validation
const FormSchema = z.object({
    album: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
export function SearchForm({ accessToken }: Props) {
  
  const [albums, setAlbums] = useState<Album[]>([]);

  // Define the form and form type
  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        album: "",
      },
  })
 
  // Define form submission handler
  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios.get(`https://api.spotify.com/v1/search?q=${data.album}&type=album&market=ES&limit=40`,  {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((response) => {

      const uniqueAlbums: any[] = [];
      const seenAlbumNames = new Set();
        
      response.data.albums.items.forEach((album: any) => {
        if (!seenAlbumNames.has(album.name)) {
          seenAlbumNames.add(album.name);
          uniqueAlbums.push(album);
        }
      });

      const albums = uniqueAlbums.filter((item: any) => item.album_type === "album");
      
      console.log(albums)
      setAlbums(albums);
    })
    .catch((error) => {
      console.error(error)
    })
  }
 
    return (
    <><div className="w-2/3 flex flex-col items-center justify-center">
        <Tabs className="w-full space-y-6" defaultValue="album">
          <TabsList>
            <TabsTrigger className="w-[150px]" value="album">Albums</TabsTrigger>
            <TabsTrigger className="w-[150px]" value="track">Tracks</TabsTrigger>
          </TabsList>
          <TabsContent value="album" className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
        <div className="h-full w-full grid grid-cols-1 gap-8 md:grid-cols-3">
          {albums.map((album) => {
            console.log(album)
            return (
              <Card key={album.id} className="">
                <CardHeader>
                    <img src={album.images[0].url} draggable="false"></img>
                </CardHeader>

                <CardContent>
                  <CardTitle>{album.name}</CardTitle>
                  <CardDescription>
                    {album.artists.map(artist => (" " + artist.name))}
                  </CardDescription>
                </CardContent>

                <CardFooter>
                  <div className="md:w-1/2">
                    <Button>Add to Rack</Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div></>
  )
}