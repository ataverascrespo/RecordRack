/**
 * Name: SearchForm.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the form and schema logic for searching for records via Spotify API.
*/

"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"

//Component imports
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

//Model imports
import { useStore } from "@/app/stores/store"

/* 
  Form schema for search validation
*/
const FormSchema = z.object({
  album: z.string().min(2, {
    message: "Must enter at least 2 characters.",
  }),
  type: z.string()
})

export function SearchForm() {
  // Access the global Mobx stores
  const { searchStore } = useStore();

  //Initialize the toast notification
  const { toast } = useToast()

  /* 
     Define the form and form type
  */
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      album: searchStore.searchQuery,
      type: "album"
    },
  })


  /* 
      Define form submission handler for an empty result
  */
  function onEmptyResult() {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "We couldn't find anything with that name.",
    })
  }

  /*
      Define form submission handler for album
  */
  const onSubmitAlbum = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Call search store API fetch function for searched albums
      const response = await searchStore.getAlbums(data.album);
      if (response.success == true) {
        // If no albums are returned, display an appropriate toast
        if (searchStore.searchAlbums.length === 0) {
          onEmptyResult();
        }
      }
    } catch (error) {
      throw (error);
    }
  }

  /* 
      Define form submission handler for track
  */
  const onSubmitTrack = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Call search store API fetch function for searched albums
      const response = await searchStore.getTracks(data.album);
      if (response.success == true) {
        // If no tracks are returned, display an appropriate toast
        if (searchStore.searchTracks.length === 0) {
          onEmptyResult();
        }
      }
    } catch (error) {
      throw (error);
    }
  }

  return (
    <div className="w-full lg:w-2/3 h-full flex flex-col items-center justify-center">
      <Tabs className="w-full space-y-6" defaultValue={searchStore.searchType}>
        <TabsList className="w-full md:w-2/3 lg:w-1/3">
          <TabsTrigger className="w-1/2" value="album">Albums</TabsTrigger>
          <TabsTrigger className="w-1/2" value="track">Tracks</TabsTrigger>
        </TabsList>
        <TabsContent value="album" className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAlbum)} className="w-fullspace-y-6">
              <FormField
                control={form.control}
                name="album"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row gap-4 items-center">
                        <Input className="text-sm lg:text-base shadow-inner" placeholder="Enter album/artist name..." {...field} />
                        <Button className="px-3 lg:px-8 shadow-md" type="submit" size="lg"><p className="text-sm md:text-base">Search</p></Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )} />

            </form>
          </Form>

        </TabsContent>
        <TabsContent value="track">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitTrack)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="album"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row gap-4 items-center">
                        <Input className="text-sm lg:text-base shadow-md" placeholder="Enter track/artist name..." {...field} />
                        <Button className="px-3 lg:px-8 shadow-md" type="submit" size="lg"><p className="text-sm md:text-base">Search</p></Button>
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