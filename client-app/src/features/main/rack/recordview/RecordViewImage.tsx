/**
 * Name: RecordViewImage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file accepts props from RecordView.tsx. 
 *          It renders the viewed record's image and configures the back button link to the user's RackList.
*/

import { ProfileUser } from '@/app/models/profile';
import { SavedRecord } from '@/app/models/record';
import { useStore } from '@/app/stores/store';
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Define component icons
export const Icons = {
    back: ChevronLeft,
    forward: ChevronRight,
    exit: ArrowLeft
};

// Define component props
interface Props {
    user: ProfileUser;
    record: SavedRecord;
}

function RecordViewImage({ user, record }: Props) {
    const navigate = useNavigate();
    const params = useParams();

    const { recordStore } = useStore();
    const { savedRecords, savedRecordsSearchQuery, savedRecordsSortType } = recordStore;      
    
    // Initialize local state for tracking current position relative to all records
    const [recordsArray] = useState(savedRecords
        .filter(record => record.albumType === savedRecordsSortType)
        .filter((record) => record.albumName.toLowerCase().includes(savedRecordsSearchQuery.toLowerCase()))
        .map(record => record.id)
    );

    /*
        Function to handle navigation to profile
    */
    function handleBackToProfile() {
        //If the user navigated to rack page via URL. 
        if (!user || user.userName != params.username) {
            navigate(`/${params.username}`)
        }
        //if user navigated to rack page via rack list
        else {
            navigate(-1);
        }
    }

    /*
        Function to handle back/forth navigation between records
    */
    function handleRackNavigation(direction: string) {
        // Get the index of the currently accessed array in the filtered and mapped savedRecords array
        var currIndex = recordsArray.indexOf(record.id);
        
        if (direction === "back") {
            // Set, navigate to and load the previous record
            var prevIndex = recordsArray[currIndex - 1];
            navigate(`/${params.username}/record/${prevIndex}`, { replace: true })
            recordStore.loadRecord(prevIndex);
        } 
        else {
            // Set, navigate to and load the next record
            var nextIndex = recordsArray[currIndex + 1];
            navigate(`/${params.username}/record/${nextIndex}`, { replace: true })
            recordStore.loadRecord(nextIndex);
        }
    }

    var currIndex = recordsArray.indexOf(record.id);
    var forwardDisabled, backDisabled;

    // Verify index is greater than 0 
    // This ensures array index of -1 cannot be accessed
    if (currIndex >= 0 && currIndex < recordsArray.length - 1) {
        forwardDisabled = false;
    } else {
        forwardDisabled = true;
    }
    // Verify index is between 0 and the length of the array
    // This ensures array index of length + 1 cannot be accessed
    if (currIndex > 0) {
        backDisabled = false; 
    } else {
        backDisabled = true;
    }
    
    return (
        <div className="flex flex-col mt-28 w-full sm:w-3/4 md:w-2/3 gap-6 items-start justify-between lg:justify-center sm:self-start lg:self-center">
            <div className="w-full flex flex-row gap-2 pt-4">
                <Button variant={"secondary"} onClick={() => handleBackToProfile()}>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <Icons.exit className="h-[2vh]" />
                        <p className="text-xs xxs:text-sm mr-2">{params.username}</p>
                    </div>
                </Button>
                {savedRecords.length === 0 
                ?
                // Render empty div if saved records is of length 0
                <div></div>
                :
                // Render forward/backward nav buttons if saved records length is > 0
                <div className="flex flex-row gap-2">
                    <Button variant={"secondary"} disabled={backDisabled} onClick={() => handleRackNavigation("back")}>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Icons.back className="h-[2vh]" />
                        </div>
                    </Button>
                    <Button variant={"secondary"} disabled={forwardDisabled} onClick={() => handleRackNavigation("forward")}>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Icons.forward className="h-[2vh]" />
                        </div>
                    </Button>
                </div>                
                }
            </div>
            <img
                className="mt-0 rounded-xl shadow-lg"
                src={record.photoURL}
                alt="hero"
                draggable="false"
            />
        </div>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(RecordViewImage)