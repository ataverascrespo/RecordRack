/**
 * Name: ProfileFollowButton.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the display for following a user, and setups the logic - state relationship.
*/

import { Button } from '@/components/ui/button'
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { User, UserCheck } from 'lucide-react';

// Define the component props
interface Props {
    buttonText: string;
    width: string;
}

// Define the component icons
export const Icons = {
    follow: User,
    following: UserCheck,
};

function ProfileFollowButton({buttonText, width} : Props) {

    // Access Mobx global stores
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;

    // Initialize local state
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        // Evaluate whether the currently viewed user is followed by the logged in user
        if (viewedUser?.following) setIsFollowed(true)
        else setIsFollowed(false);
    }, []);

    /*
        Defines function to handle user following
    */
    const handleFollow = async () => {
        //Call the follow function
        const response = await profileStore.followUser(viewedUser!.id);
        //Check if the returned data dictates whether the user is followed
        if (response.data.following) {
            setIsFollowed(true)
        } else {
            setIsFollowed(false)
        }
    }

    // Define dynamic follow button text and icon
    let followButton, followIcon;

    // If the viewed user is followed, display that information
    if (isFollowed) {
        followButton = "Following"
        followIcon = <Icons.following className="h-[2vh]" />
        return (
            <Button variant={"default"} className={`${width} shadow-md`} onClick={handleFollow}>
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-sm">{followButton}</p>
                    {followIcon}
                </div>
            </Button>
        )
    } 
    // If the viewed user is NOT followed, display that information
    else {
        followButton = buttonText;
        followIcon = <Icons.follow className="h-[2vh]" />
        return (
            <Button variant={"secondary"} className={`${width} shadow-md`} onClick={handleFollow}>
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-sm">{followButton}</p>
                    {followIcon}
                </div>
            </Button>
        )
    }
}

// Wrap component in observer to respond to MobX state changes
export default observer(ProfileFollowButton)