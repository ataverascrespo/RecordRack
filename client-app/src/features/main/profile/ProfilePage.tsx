import { observer } from "mobx-react-lite";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollower from "./ProfileFollower";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/app/stores/store";

function ProfilePage() {
    const { userStore } = useStore();

    function handleLogout() {
        userStore.logout();
    }

    return (
        <div className="h-full w-full -mt-16 md:-mt-0 flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-24 items-center md:items-start">

            <div className="flex flex-col w-2/3 md:w-1/5 gap-6">
                <img className="w-full rounded-full shadow-lg"
                    src="https://i.scdn.co/image/ab67616d0000b27310e6745bb2f179dd3616b85f" alt="profile picture" draggable="false" />
            </div>

            <div className="h-full w-full md:w-1/2 lg:w-3/4 flex flex-col gap-4 xl:gap-8 items-start">

                {/* Name*/}
                <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="font-semibold text-base md:text-lg xl:text-2xl text-neutral-500 dark:text-neutral-600">Welcome back</h2>
                    <div className="mt-2 md:mt-0 w-auto flex flex-col md:flex-row items-center gap-8">
                        <h1 className="font-black text-neutral-900 text-xl sm:text-3xl lg:text-4xl xl:text-6xl leading-none dark:text-neutral-50">
                            alextaveras23
                        </h1>
                        <Dialog>
                            <DialogTrigger asChild className="cursor-pointer">
                                <Button size="lg"><p className="text-sm lg:text-base xl:text-lg">Log Out</p></Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[75vw] lg:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        <p className="mb-12">Are you sure you want to log out?</p>
                                    </DialogTitle>
                                    <DialogFooter>
                                        <Button size="lg" onClick={handleLogout}><p className="text-sm lg:text-base xl:text-lg">Log Out</p></Button>
                                    </DialogFooter>
                                </DialogHeader>
                            </DialogContent>

                        </Dialog>
                        {/* <Button className="w-full"><p className="text-base">Follow</p></Button> */}
                    </div>
                </div>

                {/* Lower section */}
                <div className="grid grid-cols-2 gap-12 mt-6 md:mt-0 self-center md:self-start">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"link"} className="px-0 py-0 "><p className="w-3/4 md:w-full text-sm lg:text-lg font-light text-neutral-600 text-center lg:text-left dark:text-neutral-300"><span className="font-bold">12</span> followers</p></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="">alextaveras2's followers</DialogTitle>
                            </DialogHeader>
                            <ProfileFollower></ProfileFollower>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"link"} className="px-0 py-0"><p className="w-3/4 md:w-full text-sm lg:text-lg font-light text-neutral-600 text-center lg:text-left dark:text-neutral-300"><span className="font-bold">32</span> following</p></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="">alextaveras2 is following</DialogTitle>
                            </DialogHeader>
                            <ProfileFollowing></ProfileFollowing>
                        </DialogContent>
                    </Dialog>
                </div>

                <Separator className="w-2/3"></Separator>
            </div>
        </div>
    )
}

export default observer(ProfilePage)
