import { SheetClose, SheetDescription, SheetFooter, SheetTitle, } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { useStore } from "@/app/stores/store";
import { useState } from "react";
import ProfileAccountSettings from "./ProfileAccountSettings";
import ProfilePasswordSettings from "./ProfilePasswordSettings";
import { SettingsIcon } from "lucide-react";

export const Icons = {
    settings: SettingsIcon,
};

function ProfilePageSettings() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;

    const [profileSettings, routeProfileSettings] = useState(false);
    const [passwordSettings, routePasswordSettings] = useState(false);

    function handleProfile() {
        routeProfileSettings(true);
    }

    function handlePassword() {
        routePasswordSettings(true);
    }

    function handleHome() {
        routeProfileSettings(false);
        routePasswordSettings(false);
    }

    let sheetContent;
    let sheetButton;

    if (profileSettings) {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleHome} className="w-full shadow-md">Back to Settings</Button>
                <ProfileAccountSettings></ProfileAccountSettings>
            </div>
        sheetButton = <div></div>
    }
    else if (passwordSettings) {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleHome} className="w-full shadow-md">Back to Settings</Button>
                <ProfilePasswordSettings></ProfilePasswordSettings>
            </div>
        sheetButton = <div></div>

    }
    else {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleProfile} className="w-full shadow-md">Profile Settings</Button>
                <Button variant={"secondary"} onClick={handlePassword} className="w-full shadow-md">Change Password</Button>
            </div>
        sheetButton = <Button type="submit" className="w-full">Exit</Button>

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
                {sheetContent}
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <div className="w-full self-end">
                        {sheetButton}
                    </div>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}

export default ProfilePageSettings