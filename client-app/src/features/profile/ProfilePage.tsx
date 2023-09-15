import { observer } from "mobx-react-lite";
import Footer from "@/app/layout/Footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollower from "./ProfileFollower";
import { useStore } from "@/app/stores/store";

function ProfilePage() {
    return (
        <section id="hero" className="container">
            <div className="lg:h-[100vh] z-0 mt-48 lg:mt-0 flex flex-col justify-end lg:flex-row lg:justify-start items-center gap-24">
                <img className="w-full md:w-[75%] lg:w-[40%] mt-12 lg:mt-0 rounded-full shadow-xl" src="https://i.scdn.co/image/ab67616d0000b27310e6745bb2f179dd3616b85f" alt="hero" draggable="false" />

                <div className="flex flex-col items-center lg:items-start lg:justify-center text-center md:text-left">
                    <h1 className="max-w-xl text-xl lg:text-2xl xl:text-6xl font-extrabold text-neutral-800 dark:text-neutral-50">alextaveras2</h1>

                    <div className="flex flex-row justify-start items-center mx-2 gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"link"}><p className="max-w-xl -ml-4 mt-6 text-base lg:text-lg font-light text-neutral-600 text-center lg:text-left dark:text-neutral-300">12 followers</p></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="mt-4 lg:mt-0">alextaveras2's followers</DialogTitle>
                                </DialogHeader>
                                <ProfileFollower></ProfileFollower>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"link"}><p className="max-w-xl -ml-4 mt-6 text-base lg:text-lg font-light text-neutral-600 text-center lg:text-left dark:text-neutral-300">32 following</p></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="mt-4 lg:mt-0">alextaveras2 is following</DialogTitle>
                                </DialogHeader>
                                <ProfileFollowing></ProfileFollowing>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <div className="flex flex-row justify-start items-center mx-2 mt-12 gap-4">
                        <Link to={"/Follow"}>
                            <Button size="lg"><p className="text-base">Follow</p></Button>
                        </Link>
                        <Link to={"/racklist"}>
                            <Button size="lg"><p className="text-base">View their records</p></Button>
                        </Link>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </section>
    )
}

export default observer(ProfilePage)
