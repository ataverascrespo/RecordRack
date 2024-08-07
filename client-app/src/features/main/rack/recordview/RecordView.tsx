/**
 * Name: RecordView.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the page that configures the layout for the Record View, including validation logic.
*/

import { Label } from "@/components/ui/label";
import { Spotify } from "@/components/ui/spotify-embed";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import NotFoundView from "@/app/layout/NotFoundView";
import Loading from "@/app/layout/Loading";
import RecordViewDelete from "./buttons/RecordViewDelete";
import RecordViewAddToRack from "./buttons/RecordViewAddToRack";
import RecordViewEditFields from "./buttons/RecordViewEditFields";
import RecordViewImage from "./RecordViewImage";
import RecordViewInfo from "./RecordViewInfo";
import RecordViewShare from "./buttons/RecordViewShare";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

// Define component icons
export const Icons = {
    about: Info,
};

function RecordView() {
    const navigate = useNavigate();
    const params = useParams();

    // Access the global Mobx stores
    const { recordStore, profileStore, userStore } = useStore();
    const { viewedUser } = profileStore;
    const { user } = userStore;

    useEffect(() => {
        // Negates behaviour of scrolling halfway down page upon load
        window.scrollTo(0, 0)

        if (params.id) {
            // If the loaded record is equal to the selected record to view, there's no need to re-fetch data.
            if (params.id === recordStore.selectedRecord?.id) { return; }

            // Otherwise, we need to load the record data. 
            const loadRecord = async (id: string) => {
                try {
                    // Load the records from the domain store function
                    await recordStore.loadRecord(id);
                } catch (error) {
                    throw (error)
                }
            }
            loadRecord(params.id);
        }
    }, [recordStore])

    // Display when loading
    if (recordStore.loadingSelectedRecord) return <Loading text={"Loading record.."} height={"h-screen"}></Loading>

    // Display when record is undefined or record URL path username and record username don't match
    if (recordStore.selectedRecord == undefined || params.username !== recordStore.selectedRecord.user.userName) {
        if (params.username) {
            // Render not found view component
            return <NotFoundView text={"Could not find that user's record."} height={"h-screen"}></NotFoundView>
        }
        else {
            // Navigate to home
            navigate('/', { replace: true });
        }
    }

    // Display when record is successfully loaded
    else {
        return (
            <div className="container h-full flex flex-col mb-12 gap-8">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-10 lg:gap-12 xl:gap-24 items-center">
                    {/* Render the Record View Image component */}
                    <RecordViewImage user={viewedUser!} record={recordStore.selectedRecord} />

                    <div className="w-full mt-6 sm:mt-12 lg:mt-40 flex flex-col gap-4 xl:gap-8 items-start">
                        {/* Render Record View Info component */}
                        <RecordViewInfo record={recordStore.selectedRecord} />
                        <div className="w-full flex gap-12 flex-row items-center">

                            {params.username == user?.userName
                                ?
                                // Component for editing and deleting record off user account
                                <div className="w-full flex flex-col md:flex-row gap-4 items-start md:items-center">
                                    <div className="flex flex-row gap-2 items-center mr-4">
                                        <Label htmlFor="private" className="font-medium text-base text-neutral-900 dark:text-neutral-400 text-left">Private?</Label>
                                        <Switch id="private" disabled checked={recordStore.selectedRecord.isPrivate} />
                                    </div>
                                    <div className="flex flex-row gap-4 w-full md:w-1/2">
                                        {/* Render Record Button components if the user is signed in*/}
                                        <RecordViewEditFields />
                                        <RecordViewDelete />
                                    </div>
                                    {recordStore.selectedRecord.isPrivate ? (
                                    // Empty div, return nothing
                                    <div></div>
                                    ) : (
                                    <div className="flex flex-row gap-4 w-full md:w-1/2">
                                        {/* Render Record Button components if the user is signed in */}
                                        <RecordViewShare size={"w-full md:w-1/2"} />
                                    </div>
                                    )}
                                </div>
                                :
                                // Component for adding other user's record to your racklist
                                <div className="flex flex-row gap-4 w-full md:w-1/2 ">
                                    {/* Render Record Button components when user is not signed in */}
                                    <RecordViewAddToRack />
                                    <RecordViewShare size={"w-1/3 sm:w-1/2"} />
                                </div>
                            }
                        </div>
                    </div>

                </div>

                <div className="flex flex-col w-full gap-1">
                    <div className="mt-8">
                        {/* Render the Spotify iframe embed component based on album or track stored type*/}
                        {recordStore.selectedRecord?.albumType === "album" ? (
                            <Spotify className="mb-4" width={"100%"} link={`https://open.spotify.com/${recordStore.selectedRecord?.albumType}/${recordStore.selectedRecord?.spotifyID}`} />
                        ) : (
                            <Spotify className="mb-8 lg:mb-0" wide link={`https://open.spotify.com/${recordStore.selectedRecord?.albumType}/${recordStore.selectedRecord?.spotifyID}`} />
                        )}
                    </div>
                    <Alert className="mb-12">
                        <AlertTitle>
                            <div className="flex flex-row gap-2 items-center">
                                <Icons.about className="h-[1.2rem] w-[1.2rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
                                <p>Why is Spotify in preview mode?</p>
                            </div>
                        </AlertTitle>
                        <AlertDescription className="text-xs md:text-sm">
                            To take full advantage of the Spotify player, you need to be logged into a Spotify account on the browser you are using to access Record Rack. Login at <a href="https://open.spotify.com/" className="text-blue-500 hover:underline">spotify.com</a>
                        </AlertDescription>
                    </Alert>
                </div>
               
                
            </div>
        )
    }
}
// Wrap component in observer to respond to MobX state changes
export default observer(RecordView);