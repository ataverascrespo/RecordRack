import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import RackList from "@/features/rack/RackList";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

function RackPage() {
    const params = useParams();
    //useRef hook to persist value between renders
    const isMounted = useRef(false);
    // Access the global Mobx stores
    const { recordStore, userStore: { user } } = useStore();

    useEffect(() => {

        //also need to check. Get the user based on dynamic segment. If that user is current signed in user. display "their own rack

        
        /*
        - Use the useRef hook to create an object with a mutable .current prop
        - Checking if the prop is 'mounted' prevents useEffect from running the code on the first render 
        */
        if (!isMounted.current) {
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
            <div className="h-full mt-[12.5rem] mb-24 flex flex-col justify-start gap-12 items-start ">
                {/* Your own record rack */}
                <div className="flex flex-col gap-2 items-start">
                    <h2 className="font-semibold text-sm sm:text-base md:text-lg xl:text-2xl text-neutral-500 dark:text-neutral-600">Hey {user?.userName} </h2>
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">Welcome to your record rack</h1>
                </div>

                {/* <div className="flex flex-col gap-2 items-start">
                        <h2 className="font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-neutral-400 dark:text-neutral-600">Hey username,</h2>
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">This is OtherUsername's record rack</h1>
                    </div> */}

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