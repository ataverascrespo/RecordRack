import { Button } from '@/components/ui/button'
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';

interface Props {
    buttonText: string;
    width: string;
}


function ProfileFollowButton({buttonText, width} : Props) {

    const { profileStore } = useStore();
    const { viewedUser } = profileStore;
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (viewedUser?.following) setIsFollowed(true)
        else setIsFollowed(false);
    }, []);

    /*
        Define function to handle user following
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

    let followButton, followColour;

    if (isFollowed) {
        followButton = "Following"
        followColour = "default"
    } else {
        followButton = buttonText;
        followColour = "secondary"
    }

    return (
        <Button className={width} onClick={handleFollow}>
            <p className="text-sm">{followButton}</p>
        </Button>
    )
}

export default observer(ProfileFollowButton)