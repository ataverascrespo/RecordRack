import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from 'react-router-dom';
import RecordViewDelete from "./RecordViewDelete";

function RecordViewButtons() {
    const params = useParams();

    // Access the global Mobx stores
    const { recordStore, userStore} = useStore();
    const { user } = userStore;

    if (params.username == user?.userName) {
        return (
            <div className="flex flex-row gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Edit Fields</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                        <DialogHeader>
                            <DialogTitle className="mt-4 lg:mt-0">Editing {recordStore.selectedRecord!.albumType} {recordStore.selectedRecord!.albumName} by {recordStore.selectedRecord!.artistName}</DialogTitle>
                            <DialogDescription>
                                You can edit these fields.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Label htmlFor="message">Record Description</Label>
                            <Textarea placeholder="Change your notes or thoughts about the record." />
                            <Label htmlFor="private">Set as Private?</Label>
                            <Switch id="private" />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Edit Fields</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <RecordViewDelete></RecordViewDelete>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-row gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add to Your Rack</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                        <DialogHeader>
                            <DialogTitle className="mt-4 lg:mt-0">Adding album The Off-Season by J.Cole</DialogTitle>
                            <DialogDescription>
                                This album will be added to your racklist.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Label htmlFor="message">Record Description</Label>
                            <Textarea placeholder="Add some additional notes or thoughts about the album." />
                            <Label htmlFor="private">Set as Private?</Label>
                            <Switch id="private" />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add to Rack</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default observer(RecordViewButtons)