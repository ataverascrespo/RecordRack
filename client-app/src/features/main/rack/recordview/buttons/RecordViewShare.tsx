/**
 * Name: RecordViewShare.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the dialog for a user to delete a record from their collection.
*/

import { useStore } from "@/app/stores/store";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { Share } from 'lucide-react';
import { RWebShare } from "react-web-share";

// Define component props
interface Props {
    size: string;
}

// Define component icons
export const Icons = {
    share: Share
};

function RecordViewShare({ size }: Props) {

    // // Access the global Mobx stores
    const { userStore, recordStore } = useStore();
    const { user } = userStore;
    const { selectedRecord } = recordStore;

    return (
        <RWebShare
            data={{
                text: `Check out ${user?.userName}'s record on Record Rack!`,
                url: `${window.location.href}`,
                title: `${user?.userName}: ${selectedRecord?.albumName} by ${selectedRecord?.artistName}`,
            }}
        >
            <Button className={size}>
                <div className="flex flex-row gap-1 items-center justify-center">
                    <Icons.share className="h-[2vh]" />
                    <p className="mr-2">Share</p>
                </div>
            </Button>
        </RWebShare>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(RecordViewShare)