import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

function ProfileFollowerList() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser, viewedUserFollowers } = profileStore;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getFollowers = async (id: number) => {
            await profileStore.getFollowers(id);
        }
        getFollowers(viewedUser!.id);

        //Once the followers are fetched, stop loading
        setIsLoading(false);
    }, []);


    //If followers are loading, or there are no followers, return an empty display
    if (isLoading) return <div></div>
    if (!viewedUserFollowers || viewedUserFollowers == undefined) return <div></div>
    else {
        return (
            <div className="p-4">
                {viewedUserFollowers.map((follower) => (
                    <div>
                        <div className="text-sm flex flex-row items-center justify-between">
                            <Link key={follower!.id} className="items-center hover:brightness-110 dark:hover:brightness-90 transform duration-100"
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
                            <Button>Follow</Button>
                        </div>
                        <Separator className="my-4" />
                    </div>
                ))}
            </div>
        )
    }
}

export default observer(ProfileFollowerList)