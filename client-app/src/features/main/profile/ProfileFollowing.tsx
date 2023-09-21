import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `following ${a.length - i}`
)

function ProfileFollowing() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} className="px-0 py-0"><p className="w-3/4 sm:w-full text-sm sm:text-base font-light text-neutral-800 text-center lg:text-left dark:text-neutral-300"><span className="font-bold">32</span> following</p></Button>
            </DialogTrigger>
            <DialogContent className="max-w-[75vw] lg:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="pt-8">alextaveras2 is following</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-72 w-full rounded-md border">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Following</h4>
                        {tags.map((tag) => (
                            <>
                                <div key={tag} className="text-sm">
                                    {tag}
                                </div>
                                <Separator className="my-2" />
                            </>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileFollowing