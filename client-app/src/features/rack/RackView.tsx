import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spotify } from "@/components/ui/spotify-embed";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from 'react-router-dom';
import RackViewHeader from "./RackViewHeader";
import { useEffect } from "react";


function RackView() {
    const navigate = useNavigate();
    const params = useParams();
    // Access the global Mobx stores
    const { recordStore, userStore: { user } } = useStore();

    //Negates behaviour of scrolling halfway down page upon load
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    function formatAddedDate(date: string) {
        // Parse the original date string into a Date object
        const dateObject = new Date(date);

        // Format the Date object into the desired format "YYYY-MM-DD"
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');

        // Create the formatted date string
        return `${year}-${month}-${day}`;
    }

    //If the selected record is undefined
    /*
        Because of the way the viewed record is selected, navigating by URL ain't gonna cut it
        So if you try to navigate to a user's specific record by URL rather than through their racklist,
        you will get redirected to their racklist.
    */
    if (recordStore.selectedRecord == undefined) {
        if (params.username) {
            navigate(`/${params.username}/racklist`, { replace: true });
        }
        else {
            navigate('/', { replace: true });
        }
    }
    else {
        return (
            <div className="container h-full flex flex-col gap-12">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-10 lg:gap-12 xl:gap-24 items-center">

                    {/* Image */}
                    <div className="flex flex-col mt-28 w-full sm:w-3/4 md:w-2/3 gap-6 items-start justify-between lg:justify-center sm:self-start lg:self-center">
                        <Button variant="link" className="pl-0">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                            <Link to={`/${params.username}/racklist`} onClick={recordStore.unselectRecord}>
                                <p className="text-base">Back to {params.username}'s record rack</p>
                            </Link>
                        </Button>
                        <img className="mt-0 rounded-xl shadow-lg"
                            src={recordStore.selectedRecord?.photoURL} alt="hero" draggable="false" />
                    </div>

                    {/* Album info */}
                    <div className="w-full mt-6 sm:mt-12 lg:mt-40 flex flex-col gap-4 xl:gap-8 items-start">

                        {/* Name, artist, etc */}
                        <div className="w-full flex flex-col items-start">
                            <RackViewHeader albumName={recordStore.selectedRecord?.albumName}></RackViewHeader>
                            <h2 className="max-w-xl text-lg md:text-2xl font-semibold text-neutral-800 text-left dark:text-neutral-100">
                                {(recordStore.selectedRecord!.albumType).charAt(0).toUpperCase() + recordStore.selectedRecord!.albumType.slice(1)} by {recordStore.selectedRecord?.artistName}
                            </h2>
                            <div className="flex flex-col mt-8 lg:flex-row items-start lg:items-center">
                                <h2 className="max-w-xl text-lg lg:text-xl text-neutral-800 text-left dark:text-neutral-100">
                                    Released on {recordStore.selectedRecord?.releaseDate}
                                </h2>
                                <p className="hidden lg:block mx-3 text-xl leading-0 ">&#x2022;</p>
                                <h3 className="max-w-xl text-lg lg:text-xl text-neutral-700 text-left dark:text-neutral-400">
                                    Added on {formatAddedDate(recordStore.selectedRecord!.dateAdded)}
                                </h3>
                            </div>
                        </div>

                        {/* RECORD DESCRIPTION */}
                        <div className="flex flex-row gap-12 mt-4 lg:mt-0 items-start w-full text-neutral-800 dark:text-neutral-50">
                            <div className="grid w-full gap-4 py-4">
                                <Label htmlFor="message" className="text-base md:text-xl font-bold">Record Description</Label>
                                <Textarea className="resize-none xl:h-[160px] placeholder:text-neutral-950 bg-neutral-200" placeholder={recordStore.selectedRecord?.albumDescription} disabled />
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-start">
                            <div className="flex gap-12 flex-row items-center">
                                <div className="flex flex-row gap-4 items-center">
                                    <Label htmlFor="private" className="text-base md:text-xl font-bold">Private</Label>
                                    <Switch id="private" disabled checked={recordStore.selectedRecord?.isPrivate} />
                                </div>
                                {params.username == user?.userName ?
                                    <div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button>Edit Fields</Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                                <DialogHeader>
                                                    <DialogTitle className="mt-4 lg:mt-0">Editing {recordStore.selectedRecord!.albumType} {recordStore.selectedRecord!.albumName} by {recordStore.selectedRecord!.artistName}</DialogTitle>
                                                    <DialogDescription>
                                                        You can edit these fields.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <Label htmlFor="message">Record Description</Label>
                                                    <Textarea placeholder="Change your notes or thoughts about the record." />
                                                    <Label htmlFor="private">Set as Private?</Label>
                                                    <Switch id="private" />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Add to Rack</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    : <div className="flex flex-row gap-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button>Add to Your Rack</Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                                <DialogHeader>
                                                    <DialogTitle className="mt-4 lg:mt-0">Adding album The Off-Season by J.Cole</DialogTitle>
                                                    <DialogDescription>
                                                        This album will be added to your racklist.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <Label htmlFor="message">Record Description</Label>
                                                    <Textarea placeholder="Add some additional notes or thoughts about the album." />
                                                    <Label htmlFor="private">Set as Private?</Label>
                                                    <Switch id="private" />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Add to Rack</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>

                {recordStore.selectedRecord?.albumType === "album"
                    ? (<Spotify className="mb-20" width={"100%"}
                        link={`https://open.spotify.com/${recordStore.selectedRecord?.albumType}/${recordStore.selectedRecord?.spotifyID}`} />)
                    : (<Spotify className="mb-8 lg:mb-0" wide
                        link={`https://open.spotify.com/${recordStore.selectedRecord?.albumType}/${recordStore.selectedRecord?.spotifyID}`} />)}

            </div>
        )
    }


}

export default observer(RackView);