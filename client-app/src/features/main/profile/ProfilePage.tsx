import { observer } from "mobx-react-lite";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollower from "./ProfileFollower";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/app/stores/store";

function ProfilePage() {
    const { userStore } = useStore();
    const { user, viewedUser } = userStore;

    function handleLogout() {
        userStore.logout();
    }

    let profileH2Content;
    let profileButtonContent;

    // If the user is logged in and the viewed user is the same
    if ((user && viewedUser) && user.userName === viewedUser.userName) {
        profileH2Content = "Welcome back";
        profileButtonContent =
            <div className="w-full">
                <Dialog>
                    <DialogTrigger asChild className="cursor-pointer">
                        <Button className="w-full"><p className="text-sm">Log Out</p></Button>
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
            </div>
    } else {
        profileH2Content = "Viewing user";
        profileButtonContent =
            <Button className="col-span-2"><p className="text-sm">Follow User</p></Button>
    }


    /* 
        Component Return
    */
    return (
        <div className="w-full">
            <div className="block md:hidden h-full w-full -mt-20">
                <div className="h-full w-full flex flex-col gap-6 items-center">
                    {/* Name*/}
                    <div className="w-full xs:w-3/4 flex-grow flex flex-col items-start text-center ">
                        <h2 className="font-semibold text-base leading-none text-neutral-700 dark:text-neutral-600">{profileH2Content}</h2>
                        <div className="mt-2 md:mt-0 w-auto flex flex-col md:flex-row items-center gap-8">
                            <h1 className="font-black text-neutral-950 text-lg xs:text-2xl sm:text-3xl leading-none dark:text-neutral-50">
                                {viewedUser?.userName}
                            </h1>
                            {/* <Button className="w-full"><p className="text-base">Follow</p></Button> */}
                        </div>
                    </div>
                    <div className="flex flex-row justify-start self-center gap-8">
                        {/* Image */}
                        <div className="flex flex-col w-2/6 gap-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                                <img className="w-full h-full rounded-full object-cover"
                                    src={userStore.getProfilePhoto()} alt="profile picture" draggable="false" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 sm:gap-12 gap-y-4 self-center">
                            <ProfileFollower></ProfileFollower>
                            <ProfileFollowing></ProfileFollowing>
                        </div>
                    </div>

                    <div className="w-full xs:w-3/4 flex flex-row justify-center items-center gap-4">
                        {profileButtonContent}
                    </div>

                    <Separator className="mt-4 w-full"></Separator>
                </div>
            </div>


            <div className="hidden md:flex w-full -mt-16 flex-row gap-12 lg:gap-24 items-center">
                {/* Image */}
                <div className="flex flex-col gap-6">
                    <div className="md:w-48 md:h-48 xl:w-64 xl:h-64  rounded-full overflow-hidden shadow-lg">
                        <img className="w-full h-full object-cover"
                            src={userStore.getProfilePhoto()} alt="profile picture" draggable="false" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    {/* Name*/}
                    <div className="w-full flex flex-col items-start text-left">
                        <h2 className="font-semibold text-lg xl:text-2xl text-neutral-700 dark:text-neutral-600">{profileH2Content}</h2>

                        <h1 className="font-black text-neutral-950 text-lg sm:text-3xl lg:text-4xl xl:text-5xl leading-none dark:text-neutral-50">
                            {viewedUser?.userName}
                        </h1>
                    </div>

                    {/* Lower section */}
                    <div className="grid grid-cols-2 gap-12 gap-y-4 mt-6 md:mt-0 self-center md:self-start">
                        <ProfileFollower></ProfileFollower>
                        <ProfileFollowing></ProfileFollowing>
                        {profileButtonContent}
                    </div>

                    <Separator className="mt-4 w-2/3"></Separator>
                </div>
            </div>
        </div>
    )
}

export default observer(ProfilePage)
