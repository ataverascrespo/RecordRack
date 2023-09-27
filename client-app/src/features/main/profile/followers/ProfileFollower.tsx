import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import ProfileFollowerList from "./ProfileFollowerList";
import { ProfileUser } from "@/app/models/profile";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";

interface Props{
    profileUser: ProfileUser;
}

function ProfileFollower({ profileUser }: Props) {
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;
    
    let followersText;
    if (!viewedUser?.followersCount || viewedUser?.followersCount == undefined) {
        followersText = " followers";
    } else {
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
            <DialogContent className="max-w-[75vw] lg:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="pt-8">{profileUser.userName}'s followers</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[75vh] md:h-[50vh] w-full rounded-md border">

                    {/* List component with fetch */}
                    <ProfileFollowerList/>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default observer(ProfileFollower)