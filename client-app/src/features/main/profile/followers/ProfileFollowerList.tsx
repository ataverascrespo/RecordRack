import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

function ProfileFollowerList() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser, viewedUserFollowers } = profileStore;
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
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

    //If followers are loading, or there are no followers, return an empty display
    if (isLoading) {
        return <div className="h-[50vh] flex flex-row items-center justify-center">Loading...</div>
    }
    else if (viewedUserFollowers == undefined || viewedUserFollowers.length == 0) {
        return <div className="h-[50vh] flex flex-row items-center justify-center">No followers.</div>
    }
    else {
        return (
            <div className="p-4">
                {viewedUserFollowers.map((follower) => (
                    <div key={follower!.id}>
                        <div className="text-sm flex flex-row items-center justify-between">
                            <Link onClick={dialogClose} className="items-center hover:brightness-110 dark:hover:brightness-90 transform duration-100"
                                to={`/${follower!.userName}/profile`}>
                                <div className='flex flex-row items-center justify-start gap-6'>
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

export default observer(ProfileFollowerList)