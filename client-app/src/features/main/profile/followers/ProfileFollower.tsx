/**
 * Name: ProfileFollower.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the component that displays user's followers count.
 *          It also configures the component that displays the followers list.
*/

import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import ProfileFollowerList from "./ProfileFollowerList";
import { ProfileUser } from "@/app/models/profile";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";

// Define the component props
interface Props{
    profileUser: ProfileUser;
}

function ProfileFollower({ profileUser }: Props) {
    // Access the Mobx global store
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;
    
    // Define dynamic content for followers info
    let followersText;
    if (!viewedUser?.followersCount || viewedUser?.followersCount == undefined) {
        // If the followers count is null or undefined, set the text to 'followers'
        // This is done because the list will count as '0 followers'
        followersText = " followers";
    } else {
        // Evaluate whether the non-empty followersCount list is 1 or larger
        // If 1, set text to follower such that text displays '1 follower'
        // If not 1, set text to followers such that text displays 'x followers'
        followersText = viewedUser?.followersCount === 1 ? ' follower' : ' followers';
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} className="px-0 py-0 ">
                    <p className="w-3/4 sm:w-full text-sm sm:text-base font-light text-neutral-800 text-center lg:text-left dark:text-neutral-300">
                        <span className="font-bold">
                            {viewedUser?.followersCount}
                        </span>
                        {followersText}
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[85vw] lg:max-w-[500px] h-[60vh] md:h-[65vh]">
                <DialogHeader>
                    <DialogTitle className="pt-8">{profileUser.userName}'s followers</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[40vh] md:h-[50vh] w-full rounded-md border">

                    {/* List component with fetch */}
                    <ProfileFollowerList/>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(ProfileFollower)