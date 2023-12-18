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
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react";

// Define the component props of type SavedRecord
interface Props {
    record: SavedRecord;
}

function RackListRecords({ record }: Props) {

    // Track the image loaded state
    const [isLoaded, setIsLoaded] = useState(false);

    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;

    const handleImageLoaded = () => {
        // Set the state of image loading as true
        // This avoids the text loading before image, making the page render look janky
        setIsLoaded(true);
    }

    return (
        // Wrap the component in a link to the record view URL
        <Link key={record.id} to={`/${viewedUser!.userName}/record/${record.id}`}>
            <Card className="px-2 pt-2 md:px-4 md:pt-4 shadow-none border-0 bg-background dark:bg-background hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200">
                <CardHeader className="p-0">
                    <img
                        loading="lazy"
                        src={record.photoURL}
                        alt={record.albumName}
                        draggable="false"
                        // Define all size breakpoints to fit in container onload
                        className="rounded-md border-0 object-contain 
                            h-[110px] w-[110px] 
                            xxxs:h-[130px] xxxs:w-[130px]
                            xxs:h-[140px] xxs:w-[140px]
                            xs:h-[180px] xs:w-[180px]
                            sm:h-[264px] sm:w-[264px]
                            md:h-[312px] md:w-[312px]
                            lg:h-[277px] lg:w-[277px]
                            xl:h-[260px] xl:w-[260px]
                            2xl:h-[290px] 2xl:w-[290px]
                            3xl:h-full 3xl:w-full
                        "
                        onLoad={() => handleImageLoaded()}
                        />
                </CardHeader>
                <CardFooter className="p-0 py-4 items-start ">
                    <div className="w-full flex flex-col items-start text-left">
                        {/* Show skeleton when image loading */}
                        {isLoaded ? (
                            // Track and artist name
                            <p title={record.albumName} className="w-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight truncate">
                                {record.albumName}
                            </p>
                        ) : (
                            <Skeleton className="h-3 md:h-4 mb-2 w-full" />
                        )}
                        {isLoaded ? (
                            // Artist name
                            <p title={record.artistName} className="w-full text-xs sm:text-sm lg:text-base text-neutral-500 dark:text-neutral-400 tracking-tight truncate">
                                {record.artistName}
                            </p>
                        ) : (
                            <Skeleton className="h-2.5 md:h-3 w-2/3" />
                        )}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}



export default RackListRecords