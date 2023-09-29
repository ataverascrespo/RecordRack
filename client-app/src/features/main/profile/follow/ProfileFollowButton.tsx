import { Button } from '@/components/ui/button'
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { User, UserCheck } from 'lucide-react';

interface Props {
    buttonText: string;
    width: string;
}

export const Icons = {
    follow: User,
    following: UserCheck,
};

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

    let followButton, followIcon;

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
    } else {
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

export default observer(ProfileFollowButton)