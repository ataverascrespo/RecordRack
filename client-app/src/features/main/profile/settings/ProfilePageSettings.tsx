/**
 * Name: ProfilePageSettings.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file is the parent component for all user settings. It configures the sheet content for all
 *          the different sub-pages of settings.
*/

import { SheetDescription, SheetFooter, SheetTitle, } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { useStore } from "@/app/stores/store";
import { useState } from "react";
import ProfileAccountSettings from "./ProfileAccountSettings";
import ProfilePasswordSettings from "./ProfilePasswordSettings";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import ProfileLogout from "./ProfileLogout";

// Define component icons
export const Icons = {
    settings: SettingsIcon,
    logOut: LogOutIcon,
};

function ProfilePageSettings() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;
    // Initialize local states
    const [profileSettings, routeProfileSettings] = useState(false);
    const [passwordSettings, routePasswordSettings] = useState(false);
    const [logout, routeLogout] = useState(false);

    /*
        Function that saves the state of the routed page (in this case, Profile) to true.
        - Routes user to profile settings
    */
    function handleProfile() {
        routeProfileSettings(true);
    }

    /*
        Function that saves the state of the routed page (in this case, Password) to true.
        - Routes user to password change menu
    */
    function handlePassword() {
        routePasswordSettings(true);
    }

    /*
        Function that saves the state of the routed page (in this case, Logout) to true.
        - Routes user to logout
    */
    function handleLogoutNav() {
        routeLogout(true);
    }

    /*
        Function that resets the state of all sub-page routings back to false
        This triggers when the user navigates back to the home settings page.
    */
    function handleHome() {
        routeProfileSettings(false);
        routePasswordSettings(false);
        routeLogout(false);
    }

    // Define dynamic content
    let sheetContent;
    let sheetButton;

    // If profile settings is true, user has navigated there so app needs to pre-render Profile component
    if (profileSettings) {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleHome} className="w-full shadow-md">Back to Settings</Button>
                <ProfileAccountSettings></ProfileAccountSettings>
            </div>
        sheetButton = <div></div>
    }
    // If password settings is true, user has navigated so app needs to pre-render Password component
    else if (passwordSettings) {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleHome} className="w-full shadow-md">Back to Settings</Button>
                <ProfilePasswordSettings></ProfilePasswordSettings>
            </div>
        sheetButton = <div></div>
    }
    // If log out is true, user has navigated so app needs to pre-render log out component
    else if (logout) {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleHome} className="w-full shadow-md">Back to Settings</Button>
                <ProfileLogout></ProfileLogout>
            </div>
        sheetButton = <div></div>
    }
    // Otherwise, we need to pre-render the home page
    else {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleProfile} className="w-full shadow-md">Profile Settings</Button>
                <Button variant={"secondary"} onClick={handlePassword} className="w-full shadow-md">Change Password</Button>
            </div>
        sheetButton =
                <Button className="w-full" onClick={handleLogoutNav} >
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p>Log Out</p>
                        <Icons.logOut className="h-[2vh]" />
                    </div>
                </Button>
    }
    return (
        <div>
            <div>
                <SheetTitle>
                    <p className="text-base sm:text-lg md:text-2xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-50">
                        Account Settings
                    </p>
                </SheetTitle>
                <SheetDescription>
                    Hey {viewedUser?.userName}. Here, you can make changes to your account.
                </SheetDescription>
                {/* Display the rendered page based on user navigation routing */}
                {sheetContent}
            </div>
            <SheetFooter>
                <div className="w-full self-end">
                    {sheetButton}
                </div>
            </SheetFooter>
        </div>
    )
}

export default ProfilePageSettings