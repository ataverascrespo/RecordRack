/*

    This page is responsible for the main functionality of this app.
    Splits off into two seperate features - profile and rack

*/


import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import RackList from "@/features/main/rack/RackList";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import ProfilePage from "./profile/ProfilePage";

function RackPage() {
    //const params = useParams();
    //useRef hook to persist value between renders
    const isMounted = useRef(false);
    // Access the global Mobx stores
    const { recordStore, userStore: { user } } = useStore();

    useEffect(() => {
        /*
        - Use the useRef hook to create an object with a mutable .current prop
        - Checking if the prop is 'mounted' prevents useEffect from running the code on the first render 
        */
        if (!isMounted.current) {
            //also need to check. Get the user based on dynamic segment. If that user is current signed in user. display "their own rack
            // if (params.username === user?.userName) {
            const loadRecords = async () => {
                try {
                    await recordStore.loadRecords();
                } catch (error) {
                    throw (error)
                }
            }
            loadRecords();
            // } else {
            //      console.log("yo")
            // }
        }
        //Set this to true after the initial render
        isMounted.current = true;
    }, [recordStore]);

    return (
        <div className="container">
            <div className="h-full mt-[13.5rem] mb-24 flex flex-col justify-start gap-12 items-start ">
                
                {/* Profile Portion */}
                <ProfilePage></ProfilePage>

                {/* Rack List Portion */}
                {recordStore.savedRecords.length != 0
                    ? <RackList results={recordStore.savedRecords} user={user!} ></RackList>
                    :
                    <div className="lg:h-[33vh] z-0 lg:mt-12 flex flex-col justify-end lg:flex-row lg:justify-start items-start">
                        <div className="flex flex-col items-start gap-6">
                            <h2 className="max-w-2xl mt-6 text-base lg:text-xl text-neutral-400 dark:text-neutral-700">Looks like your rack is empty! Let's search for some records...</h2>
                            <Link to={"/search"}>
                                <Button variant="secondary" size="lg"><p className="text-base text-neutral-600 dark:text-neutral-400">Search</p></Button>
                            </Link>
                        </div>
                        <img className="hidden lg:flex w-[15%] mt-12 lg:mt-0" src="/src/assets/empty.svg" alt="hero" draggable="false" />
                    </div>
                }
            </div>
        </div>
    )
}

export default observer(RackPage)