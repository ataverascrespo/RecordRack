/**
 * Name: RackListRecordsTracks.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file accepts props to render and display the individually mapped Records from the Racklist. 
 *          This component handles the rendering for TRACKS.
*/

import { SavedRecord } from "@/app/models/record";
import { useStore } from "@/app/stores/store";
import { Link } from "react-router-dom";

// Define the component props of type SavedRecord
interface Props {
    record: SavedRecord;
}

function RackListRecordsTracks({ record }: Props) {
     // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;

    return (
        // Wrap the component in a link to the record view URL
        <Link key={record.id} to={`/${viewedUser!.userName}/record/${record.id}`}>
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 p-4 md:p-6 rounded-xl bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 ">
                {/* Track image */}
                <div className="flex flex-col gap-6">
                    <div className="w-12 xxs:w-24 sm:w-32 rounded-lg overflow-hidden shadow-lg">
                        <img
                            className="w-full h-full object-cover"
                            src={record.photoURL}
                            alt={record.albumName}
                            draggable="false"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col items-start text-left gap-2 md:gap-4">
                    {/* Track and artist name */}
                    <div>
                        <h1 title={record.albumName} className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-none tracking-tight">
                            {record.albumName}
                        </h1>
                        <h2 title={record.artistName} className="text-xs sm:text-sm lg:text-base text-neutral-500 dark:text-neutral-400">
                            {record.artistName}
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RackListRecordsTracks