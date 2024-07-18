/**
 * Name: RecordViewAddToRack.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the dialog and form schema for adding another user's record to the current user's own rack list
*/

import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { AddRecord } from "@/app/models/record";
import { useStore } from "@/app/stores/store";
import { useToast } from "@/components/ui/use-toast";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { PlusSquare } from 'lucide-react';
import { Link, useParams } from "react-router-dom";

// Define component icons
export const Icons = {
    add: PlusSquare
};


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

function RecordViewAddToRack() {

    const { toast } = useToast()
    const params = useParams();

    // Access the global Mobx stores
    const { recordStore, userStore } = useStore();
    const { selectedRecord } = recordStore;
    const { user } = userStore;

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

    // Export a dialog close function by pulling the custom dialog ID. 
    // Then it simulates a click event to trigger associated event listeners and close the dialog 
    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
    };

    /* 
        Define submission handler
    */
    const onSubmit = async (data: RecordSchema) => {
        //Disable form button so that the form cannot submit multiple times
        setButtonDisabled(true);

        const newRecord: AddRecord = {
            albumName: selectedRecord!.albumName,
            artistName: selectedRecord!.artistName,
            releaseDate: selectedRecord!.releaseDate,
            albumType: selectedRecord!.albumType,
            albumDescription: data.description,
            dateAdded: new Date().toISOString(),
            photoURL: selectedRecord!.photoURL,
            spotifyID: selectedRecord!.spotifyID,
            isPrivate: data.private,
        }

        try {
            const response: any = await recordStore.addRecord(newRecord);
            //If the success field is true, set valid
            if (response.success === true) {
                toast({
                    title: `Successfully added ${newRecord.albumName} by ${newRecord.artistName}`,
                })
            }
            //If the success field is false, display error msg toast
            else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: response.returnMessage,
                })
            }
        } catch (error) {
            //If there is no response at all, display general error
            toast({
                variant: "destructive",
                title: "Oh no! Something went wrong.",
                description: "Please try again later.",
            })
        }

        // Close the dialog and enable the button for submission again.
        dialogClose();
        setButtonDisabled(false);
    }

    // Anon page access - if attempt to add to rack when logged out, redirect user to login page
    if (!user) {
        return (
            <Link to={"/accounts/login"} state={`${params.username}/record/${params.id}`} className="w-full md:w-1/2">
                <Button variant={"secondary"} className="w-full" >
                    <div className="flex flex-row gap-1 items-center justify-center">
                        <Icons.add className="h-[2vh]" />
                        <p className="mr-2">Add to Rack</p>
                    </div>
                </Button>
            </Link>
        )
    }

    else {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    {/* Dialog button trigger */}
                    <Button variant={"secondary"} className="w-full md:w-1/2" >
                        <div className="flex flex-row gap-1 items-center justify-center">
                            <Icons.add className="h-[2vh]" />
                            <p className="mr-2">Add to Rack</p>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                    <DialogHeader>
                        {/* Header */}
                        <DialogTitle className="mt-4 lg:mt-0">
                            Adding {selectedRecord?.albumType} {selectedRecord?.albumName} by {selectedRecord?.artistName}</DialogTitle>
                        <DialogDescription>
                            This {selectedRecord?.albumType} will be added to your racklist.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
        )
    }
}

// Wrap component in observer to respond to MobX state changes
export default observer(RecordViewAddToRack)