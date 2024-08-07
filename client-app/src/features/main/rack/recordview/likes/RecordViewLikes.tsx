/**
 * Name: RecordViewLikes.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the like button for a record, and the like count next to it.
 *          It also configures the display for the list of users who have liked it.
*/

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import RecordViewLikedBy from "./RecordViewLikedBy";
import { Link, useParams } from "react-router-dom";

// Define component icons
export const Icons = {
    likeIcon: Heart,
};

// Define component props
interface Props {
    id: string;
}

function RecordViewLikes({ id }: Props) {
    const params = useParams();

    // Access the global Mobx stores
    const { recordStore, userStore } = useStore();
    const { selectedRecord } = recordStore;
    const { user } = userStore;

    //Store loading and animation states
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // If the likes is undefined for the record, fetch the likes from the domain store function
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
        // Check if the record is already liked, and if it is, don't trigger animation when unliking
        if (!recordStore.isSelectedRecordLiked) {
            setIsAnimating(true);
        }

        //Call the record store delete function, and pass the current user (who is doing the liking)
        const response = await recordStore.likeRecord(userStore.user!);
        if (response.success == true) {
            setIsAnimating(false);
        }
    }
    
    // Define the appearance of the like button based on whether user has currently liked it or not.
    let likesButton, likeIconColour, likeHover;
    if (selectedRecord?.likes == undefined) {
        likesButton = "0 likes";
        likeIconColour = "none"
        likeHover = ""
    } else {
        likesButton = selectedRecord?.likes?.length === 1 ? '1 like' : `${selectedRecord?.likes?.length} likes`;
        likeIconColour = recordStore.isSelectedRecordLiked ? "red" : "none"
        likeHover = recordStore.isSelectedRecordLiked ? "" : "hover:opacity-40 transition-all duration-100"
    }

    // Render an empty div when loading
    if (isLoading) return <div></div>
    
    if (!user) {
        return (
            <div className="flex flex-row items-center -ml-2">
                {/* Display the button with dynamic props based on like status */}
                <Link to={"/accounts/login"} state={`${params.username}/record/${params.id}`}>
                    <Button size={"icon"} variant={"link"} className={`${likeHover} ${isAnimating ? 'is_animating' : ''}`}>
                        <Icons.likeIcon fill={likeIconColour} className="h-[3vh]" />
                    </Button>
                </Link>
                
                {/* Prepare the dialog component for like list */}
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
                            {/* Render the RecordViewLiked by component */}
                            <RecordViewLikedBy usersLiked={selectedRecord!.likes}/>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-row items-center -ml-2">
                {/* Display the button with dynamic props based on like status */}
                <Button onClick={handleLikes} size={"icon"} variant={"link"} className={`${likeHover} ${isAnimating ? 'is_animating' : ''}`}>
                    <Icons.likeIcon fill={likeIconColour} className="h-[3vh]" />
                </Button>
                {/* Prepare the dialog component for like list */}
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
                            {/* Render the RecordViewLiked by component */}
                            <RecordViewLikedBy usersLiked={selectedRecord!.likes}/>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

// Wrap component in observer to respond to MobX state changes
export default observer(RecordViewLikes)