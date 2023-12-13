/**
 * Name: RackListRecords.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file accepts props to render and display the individually mapped Records from the Racklist. 
 *          This component handles the rendering for ALBUMS.
*/

import { SavedRecord } from "@/app/models/record";
import { useStore } from "@/app/stores/store";
import { Card, CardFooter, CardHeader, } from "@/components/ui/card"
import { Link } from "react-router-dom";

// Define the component props of type SavedRecord
interface Props {
    record: SavedRecord;
}

function RackListRecords({ record }: Props) {
     // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;

    return (
        // Wrap the component in a link to the record view URL
        <Link key={record.id} to={`/${viewedUser!.userName}/record/${record.id}`}>
            <Card className="px-2 pt-2 md:px-4 md:pt-4 shadow-none border-0 bg-background dark:bg-background hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200">
                <CardHeader className="p-0">
                    <img
                        src={record.photoURL}
                        alt={record.albumName}
                        draggable="false"
                        className="rounded-md border-0"
                        loading="lazy"/>
                </CardHeader>
                <CardFooter className="p-0 py-4 items-start ">
                    <div className="w-full flex flex-col items-start text-left ">
                        {/* Track and artist name */}
                        <p title={record.albumName} className="w-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-none tracking-tight truncate">
                            {record.albumName}
                        </p>
                        <p title={record.artistName} className="w-full text-xs sm:text-sm lg:text-base text-neutral-500 dark:text-neutral-400 truncate">
                            {record.artistName}
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default RackListRecords