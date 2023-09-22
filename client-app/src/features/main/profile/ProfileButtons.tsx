import { useStore } from "@/app/stores/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import ProfilePhotoForm from "./ProfilePhotoForm";

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
                        <Button className="w-full md:w-1/4 lg:w-1/6"><p className="text-sm">Log Out</p></Button>
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

                {/* Component for uploading a photo via zod form */}
                <ProfilePhotoForm></ProfilePhotoForm>
            </div>
        )
    } else {
        return (
            <Button className="w-full md:w-1/3 lg:w-1/4 "><p className="text-sm">Follow User</p></Button>
        )
    }
}

export default ProfileButtons