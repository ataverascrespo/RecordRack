/**
 * Name: ProfileSettingsButton.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the button for a user to open their "Settings" page
*/

import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProfilePageSettings from "./ProfileSettingsMenu";

// Define component icons
export const Icons = {
    settings: Menu,
};

function ProfileSettingsButton() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"secondary"} className="w-full md:w-1/3 lg:w-1/6 shadow-md">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p className="text-xs xxs:text-sm">More</p>
                        <Icons.settings className="h-[2vh]" />
                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent className="xxs:max-w-[60vw] md:w-[40vw] lg:w-[45vw] overflow-y-scroll max-h-screen flex flex-col justify-between">
                    {/* Component for account settings*/}
                    <ProfilePageSettings></ProfilePageSettings>
            </SheetContent>
        </Sheet>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(ProfileSettingsButton)