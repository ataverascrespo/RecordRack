import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spotify } from "@/components/ui/spotify-embed";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

export default function RackView() {
    return (
        <div className="container h-full mb-24 flex flex-col gap-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 lg:gap-24 items-center">

                {/* Image */}
                <div className="flex flex-col mt-32 w-full sm:w-3/4 md:w-2/3 gap-6 items-start justify-between lg:justify-center sm:self-start md:self-center">
                    <Button variant="link" className="pl-0">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                        <p className="text-xs">Back to otherUsername's rack</p>
                    </Button>
                    <img className="mt-0 rounded-xl shadow-lg" src="https://i.scdn.co/image/ab67616d0000b27310e6745bb2f179dd3616b85f" alt="hero" draggable="false" />
                </div>

                {/* Album info */}
                <div className="w-full mt-12 md:mt-48 flex flex-col gap-4 lg:gap-8 items-start">

                    {/* Name, artist, etc */}
                    <div className="flex flex-col items-start">
                        <h1 className="max-w-2xl text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-50">The Off-Season</h1>
                        <h2 className="max-w-xl mt-2 text-xl font-semibold xl:text-2xl text-neutral-600 text-center lg:text-left dark:text-neutral-100">Album by J.Cole</h2>
                        <h3 className="max-w-xl mt-2 text-base text-neutral-700 text-center lg:text-left dark:text-neutral-400">on otherUsername's rack</h3>

                        {/* If on someone elses rack */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="mt-6">Add to Your Rack</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                <DialogHeader>
                                    <DialogTitle className="mt-4 lg:mt-0">Adding album The Off-Season by J.Cole </DialogTitle>
                                    <DialogDescription>
                                        This album will be added to your racklist.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <Label htmlFor="message">Album Description</Label>
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

                    {/* Desc */}
                    <div className="flex flex-row gap-12 items-start w-full text-neutral-800 dark:text-neutral-50">
                        <div className="grid w-full gap-4 py-4">
                            <Label htmlFor="message" className="text-base lg:text-xlfont-bold">Album Description</Label>
                            <Textarea className="resize-none h-full" />
                        </div>
                    </div>

                    {/* Info fields */}
                    <div className="grid grid-cols-3 gap-4 md:gap-8 xl:gap-16 items-center text-neutral-800 dark:text-neutral-50">
                        <div className="grid gap-2 py-4">
                            <p className="text-sm md:text-base lg:text-xl font-bold">Release Date</p>
                            <p className="text-xs sm:text-sm lg:text-lg">May 15 2021</p>
                        </div>
                        <div className="grid gap-2 py-4">
                            <p className="text-sm md:text-base lg:text-xl font-bold">Date Added</p>
                            <p className="text-xs sm:text-sm lg:text-lg">August 9 2023</p>
                        </div>
                        <div className="grid gap-2 py-4">
                            <Label htmlFor="private" className="text-sm md:text-base lg:text-xl font-bold">Private</Label>
                            <Switch id="private" />
                        </div>
                    </div>
                </div>
            </div>

            <Spotify width={"100%"} link="https://open.spotify.com/album/4JAvwK4APPArjIsOdGoJXX" />
        </div>
    )
}
