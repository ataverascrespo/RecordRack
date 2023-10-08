/**
 * Name: ProfileFollowerList.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the component that displays the followers list.
*/

import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Loading from "@/app/layout/Loading";
import NotFoundView from "@/app/layout/NotFoundView";

function ProfileFollowerList() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser, viewedUserFollowers } = profileStore;
    // Initiate local state
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        // Function to get the list of followers per the ID
        const getFollowers = async (id: number) => {
            await profileStore.getFollowers(id);
            //Once the followers are fetched, stop loading
            setIsLoading(false);
        }
        getFollowers(viewedUser!.id);
    }, []);

    // Export a dialog close function by pulling the custom dialog ID. 
    // Then it simulates a click event to trigger associated event listeners and close the dialog 
    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
    };

    // If followers are loading, return a loading screen
    if (isLoading) {
        return <Loading text={"Loading followers..."} height={"h-[40vh]"}></Loading>
    }
    // If followers are falsy, return a not found screen
    else if (viewedUserFollowers == undefined || viewedUserFollowers.length == 0) {
        return <NotFoundView text={"No followers."} height={"h-[40vh]"}></NotFoundView>
    }
    else {
        return (
            <div className="p-4">
                {/* Map the list of viewed followers to seperate profile links */}
                {viewedUserFollowers.map((follower) => (
                    <div key={follower!.id}>
                        <div className="text-xs xs:text-sm flex flex-row items-center justify-between">
                            <Link onClick={dialogClose} className="items-center hover:brightness-110 dark:hover:brightness-90 transform duration-100"
                                to={`/${follower!.userName}`}>
                                <div className='flex flex-row items-center justify-start gap-4 md:gap-6'>
                                    <img
                                        src={follower?.imageURL || 'https://res.cloudinary.com/dlwfuryyz/image/upload/v1695305498/album-api/jzbiw85pakr4amttznuq.jpg'}
                                        alt="user"
                                        className='h-10 w-10 rounded-full'
                                    />
                                    {follower!.userName}
                                </div>
                            </Link>
                        </div>
                        <Separator className="my-4" />
                    </div>
                ))}
            </div>
        )
    }
}

// Wrap component in observer to respond to MobX state changes
export default observer(ProfileFollowerList)