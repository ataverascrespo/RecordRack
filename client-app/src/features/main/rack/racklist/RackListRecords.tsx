/**
 * Name: RackListRecords.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file accepts props to render and display the individually mapped Records from the Racklist. 
*/

import { SavedRecord } from "@/app/models/record";
import { useStore } from "@/app/stores/store";
import { Card, CardHeader, } from "@/components/ui/card"
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
            <Card className="shadow-md hover:shadow-xl hover:brightness-90 dark:hover:brightness-110 transition-all transform  duration-200">
                <CardHeader className="p-0">
                    <img
                        src={record.photoURL}
                        draggable="false"
                        className="rounded-md border-0"
                        loading="lazy"/>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default RackListRecords