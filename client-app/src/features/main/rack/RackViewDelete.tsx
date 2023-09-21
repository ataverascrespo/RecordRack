import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useStore } from "@/app/stores/store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { observer } from "mobx-react-lite";


function RackViewDelete() {
    
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
        dialogClose();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete Record</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[75vw] lg:max-w-[725px] py-8">
                <DialogHeader>
                    <DialogTitle className="mt-4 lg:mt-0">Deleting {recordStore.selectedRecord!.albumType} {recordStore.selectedRecord!.albumName} by {recordStore.selectedRecord!.artistName}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to proceed? This change is irreversible.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Button onClick={handleDelete}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default observer(RackViewDelete)