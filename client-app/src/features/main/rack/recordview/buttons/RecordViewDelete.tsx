/**
 * Name: RecordViewDelete.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the dialog for a user to delete a record from their collection.
*/

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useStore } from "@/app/stores/store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { observer } from "mobx-react-lite";
import { Trash2 } from 'lucide-react';

// Define component icons
export const Icons = {
    delete: Trash2
};

function RecordViewDelete() {
    
    const navigate = useNavigate();
    const { toast } = useToast()

    // Access the global Mobx stores
    const { userStore, recordStore } = useStore();

    // Export a dialog close function by pulling the custom dialog ID. 
    // Then it simulates a click event to trigger associated event listeners and close the dialog 
    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
    };

    /*
        Define function to handle record deletion
    */
    const handleDelete = async () => {
        //Call the record store delete function
        await recordStore.deleteRecord(recordStore.selectedRecord!.id);

        //Navigate back to user racklist
        navigate(`/${userStore.user?.userName}`)
        toast({
            title: `Successfully deleted record.`,
        })

        // Close the dialog
        dialogClose();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* Dialog trigger button */}
                <Button className="w-full md:w-1/2" variant={"secondary"} >
                    <div className="flex flex-row gap-1 items-center justify-center">
                        <Icons.delete className="h-[2vh]" />
                        <p className="mr-2">Delete</p>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[75vw] lg:max-w-[725px] py-8">
                <DialogHeader>
                    <DialogTitle className="mt-4 lg:mt-0">Deleting {recordStore.selectedRecord!.albumType} {recordStore.selectedRecord!.albumName} by {recordStore.selectedRecord!.artistName}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to proceed? This change is irreversible.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    {/* Button that handles delete */}
                    <Button onClick={handleDelete}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(RecordViewDelete)