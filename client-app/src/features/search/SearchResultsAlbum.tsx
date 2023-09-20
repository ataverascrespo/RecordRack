import * as z from "zod"

import { SpotifyAlbum } from "@/app/models/spotifyAlbum";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { AddRecord } from "@/app/models/record";
import { useStore } from "@/app/stores/store";
import { useState } from "react";

// Define the component props
interface Props {
    results: SpotifyAlbum[];
}

/* 
  Form schema for record save
*/
const recordSchema = z.object({
    description: z.string().min(1, { message: "Description is required" }),
    private: z.boolean()
})

/* 
    Define the inferred schema
*/
type RecordSchema = z.infer<typeof recordSchema>;

export default function SearchResults({ results }: Props) {

    //Initialize user store
    const { recordStore } = useStore();
    //Initialize toast component
    const { toast } = useToast()

    const [buttonDisabled, setButtonDisabled] = useState(false);


    /* 
        Define the form and form type
    */
    const form = useForm<RecordSchema>({
        resolver: zodResolver(recordSchema),
        defaultValues: {
            description: "",
            private: false,
        },
    })

    // Function to format artists based on result/track listed amount
    const formatArtists = (artists: { name: string }[]) => {
        if (artists.length === 1) {
            return artists[0].name; // Return the single artist's name
        } else if (artists.length >= 2) {
            return artists.map(artist => artist.name).join(', '); // Concatenate multiple artist names
        }
        return '';
    };

    // Export a dialog close function by pulling the custom dialog ID. 
    // Then it simulates a click event to trigger associated event listeners and close the dialog 
    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
        form.reset();
    };
    
    /* 
        Define submission handler
    */
    const onSubmit = async (data: RecordSchema, result: SpotifyAlbum) => {
        //Disable form button so that the form cannot submit multiple times
        setButtonDisabled(true);

        const newRecord: AddRecord = {
            albumName: result.name,
            artistName: formatArtists(result.artists),
            releaseDate: result.release_date,
            albumType: result.album_type,
            albumDescription: data.description,
            dateAdded: new Date().toISOString(),
            photoURL: result.images[0].url,
            spotifyID: result.id,
            isPrivate: data.private,
        }
        console.log(newRecord)

        try {
            const response: any = await recordStore.addRecord(newRecord);
            //If the success field is true, set valid
            if (response.success === true) {
                toast({
                    title: `Successfully added ${newRecord.albumName} by ${newRecord.artistName}`,
                })
                dialogClose();
            }
            //If the success field is false, display error msg toast
            else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: response.response.data.returnMessage,
                })
            }
        } catch (error) {
            //If there is no response at all, display general error
            toast({
                variant: "destructive",
                title: "Oh no! Something went wrong.",
                description: "Please try again later.",
            })
            throw (error)
        }

        setButtonDisabled(false);
    }

    return (
        <div className="h-full w-full mt-12">
            {results.length > 0 && (
                <h2 className="text-lg md:text-2xl text-right font-light">
                    Album Results ({results.length})
                </h2>
            )}
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((result) => (
                    <div key={result.id} className="">
                        <Card className="">
                            <CardHeader>
                                <img src={result.images[0].url} alt={result.name} draggable="false" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{result.name}</CardTitle>
                                <CardDescription>{formatArtists(result.artists)}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <div className="md:w-1/2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Add to Rack</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                            <DialogHeader>
                                                <DialogTitle className="mt-4 lg:mt-0">
                                                    <p className="text-xl">Adding album '{result.name}' by {formatArtists(result.artists)}</p>
                                                </DialogTitle>
                                                <DialogDescription>This album will be added to your racklist.</DialogDescription>
                                            </DialogHeader>
                                            <Form {...form}>
                                                <form onSubmit={(event) => form.handleSubmit((data) => onSubmit(data, result))(event)} className="w-full space-y-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="description"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <div className="grid gap-2">
                                                                        <Label htmlFor="message">Album Description</Label>
                                                                        <Textarea placeholder="Add some additional notes or thoughts about the album." {...field} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="private"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <div className="grid gap-2">
                                                                        <Label htmlFor="private">Set as Private?</Label>
                                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogFooter>
                                                        <Button className="w-full" type="submit" disabled={buttonDisabled}>
                                                            Add to Rack
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </Form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

