import { useStore } from "@/app/stores/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import ProfilePageSettings from "./settings/ProfilePageSettings";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import ProfileFollowButton from "./follow/ProfileFollowButton";

export const Icons = {
    logOut: LogOutIcon,
    settings: SettingsIcon,
};

function ProfileButtons() {
    const { userStore, profileStore } = useStore();
    const { isCurrentUser } = profileStore;
    
    /*
        Function to log the current user out
    */
    function handleLogout() {
        userStore.logout();
    }

    // If the user is logged in and the viewed user is the logged in user, display content specific to that user's own profile
    if (isCurrentUser) {
        return (
            <div className="w-full flex flex-row gap-2">
                <Dialog>
                    <DialogTrigger asChild className="cursor-pointer">
                        <Button className="w-full md:w-1/3 lg:w-1/6">
                            <div className="flex flex-row gap-2 items-center justify-center">
                                 <p className="text-xs xxs:text-sm">Log Out</p>
                                <Icons.logOut className="h-[3vh]" />
                           </div>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[75vw] lg:max-w-[500px] py-10">
                        <DialogHeader>
                            <DialogTitle>
                                <p className="mb-6">Are you sure you want to log out?</p>
                            </DialogTitle>
                            <Button size="lg" onClick={handleLogout}><p className="text-sm lg:text-base xl:text-lg">Log Out</p></Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

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
                         {/* Component for account settings*/}
                         <ProfilePageSettings></ProfilePageSettings>
                    </SheetContent>
                </Sheet>
            </div>
        )
    } else {
        return (
            <ProfileFollowButton buttonText={"Follow User"} width={"w-full md:w-1/3 lg:w-1/4"} />
        )
    }
}

export default ProfileButtons