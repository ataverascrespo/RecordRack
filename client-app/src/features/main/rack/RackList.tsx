import { Card, CardHeader, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Link } from "react-router-dom";
import { SavedRecord } from "@/app/models/record";
import { User } from "@/app/models/user";

// Define the component props
interface Props {
    results: SavedRecord[];
    user: User;
}

function RackList({ results, user }: Props) {

    return (
        <div className="h-full w-full mt-12">
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((result) => {
                    return (
                        <Link to={`/${user.userName}/record/${result.id}`}>
                            <Card key={result.id}
                                className="shadow-md hover:shadow-xl hover:brightness-90 dark:hover:brightness-75 transition-all transform duration-200">
                                <CardHeader className="p-0">
                                    <img
                                        style={{ viewTransitionName: `album-cover-${result.id}`, contain: 'layout' }}
                                        src={result.photoURL}
                                        draggable="false"
                                        className="rounded-md">
                                    </img>
                                </CardHeader>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )

    return (
        <div className="h-full w-full mt-12">
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((result) => {
                    return (
                        <Dialog key={result.id}>
                            <Card key={result.id} className="shadow-lg">
                                <CardHeader className="p-0">
                                    <DialogTrigger asChild className="cursor-pointer">
                                        <img src={result.photoURL} draggable="false" className="rounded-sm"></img>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                        <DialogHeader>
                                            <div className="flex flex-col sm:flex-row gap-6 mt-6 md:mt-0">
                                                <img className="w-full sm:w-2/5" src={result.photoURL} draggable="false"></img>
                                                <div className="flex flex-col gap-6 justify-center items-center sm:items-start">
                                                    <div>
                                                        <DialogTitle className="mt-4 lg:mt-0 text-2xl">
                                                            {result.albumName}
                                                        </DialogTitle>
                                                        <DialogDescription className="text-base">
                                                            Album by {result.artistName}
                                                        </DialogDescription>
                                                    </div>
                                                    <Button type="submit" onClick={() => (result.id)}>
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </CardHeader>
                            </Card>
                        </Dialog>
                    )
                })}
            </div>
        </div>
    )
}

export default RackList

