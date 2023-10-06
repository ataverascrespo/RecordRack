import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Loading from "@/app/layout/Loading";
import NotFoundView from "@/app/layout/NotFoundView";

function ProfileFollowingList() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser, viewedUserFollowing } = profileStore;
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getFollowing = async (id: number) => {
            await profileStore.getFollowing(id);
            //Once the followers are fetched, stop loading
            setIsLoading(false);
        }
        getFollowing(viewedUser!.id);
    }, []);

    // Export a dialog close function by pulling the custom dialog ID. 
    // Then it simulates a click event to trigger associated event listeners and close the dialog 
    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
    };

    //If followers are loading, or there are no followers, return an empty display
    if (isLoading) {
        return <Loading text={"Loading followed users..."} height={"h-[40vh]"}></Loading>
    }
    else if (viewedUserFollowing == undefined || viewedUserFollowing.length == 0) {
        return <NotFoundView text={"No followed users."} height={"h-[40vh]"}></NotFoundView>
    }
    else {
        return (
            <div className="p-4 w-full">
                {viewedUserFollowing.map((following) => (
                    <div key={following!.id}>
                        <div className="text-sm flex flex-row items-center justify-between">
                            <Link onClick={dialogClose} className="items-center hover:brightness-110 dark:hover:brightness-90 transform duration-100"
                                to={`/${following!.userName}`}>
                                <div className='flex flex-row items-center justify-start gap-6'>
                                    <img
                                        src={following?.imageURL || 'https://res.cloudinary.com/dlwfuryyz/image/upload/v1695305498/album-api/jzbiw85pakr4amttznuq.jpg'}
                                        alt="user"
                                        className='h-10 w-10 rounded-full'
                                    />
                                    {following!.userName}
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

export default observer(ProfileFollowingList)