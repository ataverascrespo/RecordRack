import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import RecordViewLikedBy from "./RecordViewLikedBy";

export const Icons = {
    likeIcon: Heart,
};

interface Props {
    id: number;
}

function RecordViewLikes({ id }: Props) {

    // Access the global Mobx stores
    const { recordStore } = useStore();
    const { selectedRecord } = recordStore;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (selectedRecord?.likes == undefined) {
            const getLikes = async () => {
                await recordStore.getRecordLikes(id);
            }
            getLikes();
        } 
        setIsLoading(false);

    }, [selectedRecord?.likes]);

    /*
        Define function to handle record deletion
    */
    const handleLikes = async () => {
        //Call the record store delete function
        await recordStore.likeRecord();
    }
    
    let likesButton, likeIconColour;
    if (selectedRecord?.likes == undefined) {
        likesButton = "0 likes";
        likeIconColour = "none"
    } else {
        likesButton = selectedRecord?.likes?.length === 1 ? '1 like' : `${selectedRecord?.likes?.length} likes`;
        likeIconColour = recordStore.isSelectedRecordLiked ? "red" : "none"
    }

    if (isLoading) return <div></div>
    else {
        return (
            <div className="flex flex-row items-center -ml-2">
                <Button onClick={handleLikes} size={"icon"} variant={"link"}>
                    <Icons.likeIcon fill={likeIconColour} className="h-[3vh]" />
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={"sm"} variant={"link"}>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <p className="text-base">{likesButton}</p>
                            </div>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[75vw] lg:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="pt-8">Liked by</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-72 w-full rounded-md border">
                            <RecordViewLikedBy usersLiked={selectedRecord!.likes}/>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default observer(RecordViewLikes)