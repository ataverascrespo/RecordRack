/**
 * Name: ProfileShareButton.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the button for a user to share their profile link.
*/

import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { Share } from 'lucide-react';
import { RWebShare } from "react-web-share";
import { ProfileUser } from "@/app/models/profile";

interface Props {
    user: ProfileUser;
}

// Define component icons
export const Icons = {
    share: Share
};

function ProfileShareButton({ user }: Props) {
    return (
        <RWebShare
            data={{
                text: `Check out ${user.userName}'s profile on Record Rack!`,
                url: `${window.location.href}`,
                title: `${user.userName}'s profile`,
            }}
        >
            <Button className="w-full md:w-1/3 lg:w-1/6 shadow-md">
                <div className="flex flex-row gap-1 items-center justify-center">
                    <Icons.share className="h-[2vh]" />
                    <p className="mr-2">Share</p>
                </div>
            </Button>
        </RWebShare>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(ProfileShareButton)