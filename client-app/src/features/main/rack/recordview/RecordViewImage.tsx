/**
 * Name: RecordViewImage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file accepts props from RecordView.tsx. 
 *          It renders the viewed record's image and configures the back button link to the user's RackList.
*/

import { ProfileUser } from '@/app/models/profile';
import { SavedRecord } from '@/app/models/record';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';

// Define component icons
export const Icons = {
    back: ChevronLeft
};

// Define component props
interface Props {
    user: ProfileUser;
    record: SavedRecord;
}

function RecordViewImage({ user, record }: Props) {
    const navigate = useNavigate();
    const params = useParams();

    /*
        Function to handle back navigation on rack view page
    */
    function handleBackNavigation() {
        //If the user navigated to rack page via URL. 
        if (!user || user.userName != params.username) {
            navigate(`/${params.username}`)
        }
        //if user navigated to rack page via rack list
        else {
            navigate(-1);
        }
    }

    return (
        <div className="flex flex-col mt-28 w-full sm:w-3/4 md:w-2/3 gap-6 items-start justify-between lg:justify-center sm:self-start lg:self-center">
            <Button variant={"secondary"} onClick={() => handleBackNavigation()}>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <Icons.back className="h-[2vh]" />
                    <p className="text-xs xxs:text-base mr-2">{params.username}</p>
                </div>
            </Button>
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