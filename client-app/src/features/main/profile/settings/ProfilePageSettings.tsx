import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
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
                <Button variant={"secondary"} onClick={handleHome} className="w-full">Back to Settings</Button>
                <ProfileAccountSettings></ProfileAccountSettings>
            </div>
        sheetButton = <div></div>
    }
    else if (passwordSettings) {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleHome} className="w-full">Back to Settings</Button>
                <ProfilePasswordSettings></ProfilePasswordSettings>
            </div>
        sheetButton = <div></div>

    }
    else {
        sheetContent =
            <div className="my-8 flex flex-col gap-4">
                <Button variant={"secondary"} onClick={handleProfile} className="w-full">Profile Settings</Button>
                <Button variant={"secondary"} onClick={handlePassword} className="w-full">Change Password</Button>
            </div>
        sheetButton = <Button type="submit" className="w-full">Exit</Button>

    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full md:w-1/3 lg:w-1/6">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p className="text-xs xxs:text-sm">Settings</p>
                        <Icons.settings className="h-[3vh]" />
                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[50vw] lg:max-w-[45vw] overflow-y-scroll max-h-screen flex flex-col justify-between">
                <div>
                    <SheetTitle><h1 className="text-base sm:text-lg md:text-2xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-50">Account Settings</h1></SheetTitle>
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
            </SheetContent>
        </Sheet>
    )
}

export default ProfilePageSettings