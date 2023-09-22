import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { useStore } from "@/app/stores/store";
import { useState } from "react";
import ProfileAccountSettings from "./ProfileAccountSettings";
import ProfilePasswordSettings from "./ProfilePasswordSettings";

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
        sheetButton = <Button type="submit">Exit</Button>

    }
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full md:w-1/4 lg:w-1/6"><p className="text-sm">Settings</p></Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[50vw] lg:max-w-[45vw]">
                <SheetHeader>
                    <SheetTitle>Account Settings</SheetTitle>
                    <SheetDescription>
                        Hey {viewedUser?.userName}. Here, you can make changes to your account.
                    </SheetDescription>
                </SheetHeader>
                    {sheetContent}
                <SheetFooter>
                    <SheetClose asChild>
                        {sheetButton}
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default ProfilePageSettings