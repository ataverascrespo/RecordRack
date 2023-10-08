/**
 * Name: ProfileFollowing.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the component that displays user's followeing count.
 *          It also configures the component that displays the following list.
*/

import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { ProfileUser } from "@/app/models/profile";
import ProfileFollowingList from "./ProfileFollowingList";

// Define the interface props
interface Props{
    profileUser: ProfileUser;
    followingCount: number;
}

function ProfileFollowing({ profileUser, followingCount }: Props) {
    // Define the following button content
    let followingText = ' following';
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} className="px-0 py-0 ">
                    <p className="w-3/4 sm:w-full text-sm sm:text-base font-light text-neutral-800 text-center lg:text-left dark:text-neutral-300">
                        <span className="font-bold">
                            {followingCount}
                        </span>
                        {followingText}
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[85vw] lg:max-w-[500px] h-[60vh] md:h-[65vh]">
                <DialogHeader>
                    <DialogTitle className="pt-8">{profileUser.userName} is following</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[40vh] md:h-[50vh] w-full rounded-md border">

                    {/* List component with fetch */}
                    <ProfileFollowingList/>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileFollowing