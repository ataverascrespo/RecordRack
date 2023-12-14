/**
 * Name: RecordViewEditFields.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the dialog and form schema for a user to edit the information for a saved record.
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
import { UpdateRecord } from "@/app/models/record";
import { useStore } from "@/app/stores/store";
import { useToast } from "@/components/ui/use-toast";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { PencilIcon } from 'lucide-react';

// Define component icons
export const Icons = {
    edit: PencilIcon
};

/* 
  Form schema for record update
*/
const updateRecordSchema = z.object({
    description: z.string().min(1, { message: "Description is required" }),
    private: z.boolean()
})

/* 
    Define the inferred schema
*/
type UpdateRecordSchema = z.infer<typeof updateRecordSchema>;

function RecordViewEditFields() {

    const { toast } = useToast()

    // Access the global Mobx stores
    const { recordStore } = useStore();
    const { selectedRecord } = recordStore;

    const [buttonDisabled, setButtonDisabled] = useState(false);

    /* 
        Define the form and form type
    */
    const form = useForm<UpdateRecordSchema>({
        resolver: zodResolver(updateRecordSchema),
        //Values instead of default values so that edit changes can immediately reflect
        values: {
            description: selectedRecord!.albumDescription,
            private: selectedRecord!.isPrivate,
        },
    })

    // Export a dialog close function by pulling the custom dialog ID. 
    // Then it simulates a click event to trigger associated event listeners and close the dialog 
    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
        form.reset();
    };

    /* 
        Define submission handler
    */
    const onSubmit = async (data: UpdateRecordSchema) => {
        //Disable form button so that the form cannot submit multiple times
        setButtonDisabled(true);

        const updatedRecord: UpdateRecord = {
            id: selectedRecord!.id,
            albumDescription: data.description,
            isPrivate: data.private,
        }

        try {
            // Call domain store API for updating record.
            const response: any = await recordStore.updateRecord(updatedRecord);
            //If the success field is true, set valid
            if (response.success === true) {
                toast({
                    title: `Successfully updated ${selectedRecord!.albumName} by ${selectedRecord!.artistName}`,
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

        // Close the dialog and enable the submission button again.
        dialogClose();
        setButtonDisabled(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full md:w-1/2" variant={"secondary"} >
                    <div className="flex flex-row gap-1 items-center justify-center">
                        <Icons.edit className="h-[2vh]" />
                        <p className="mr-2">Edit</p>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle className="mt-4 lg:mt-0">
                        Editing {selectedRecord?.albumType} {selectedRecord?.albumName} by {selectedRecord?.artistName}</DialogTitle>
                    <DialogDescription>
                        You can make the following changes to the selected {selectedRecord?.albumType}.
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
                            {/* Button that handles record update */}
                            <Button className="w-full" type="submit" disabled={buttonDisabled}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(RecordViewEditFields)