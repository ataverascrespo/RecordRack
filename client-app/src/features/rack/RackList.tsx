import { SpotifyAlbum } from "@/app/models/spotifyAlbum";
import { Card, CardHeader, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Link } from "react-router-dom";

// Define the component props
interface Props {
    results: SpotifyAlbum[];
}

export default function SearchResults({ results }: Props) {

    // Function to format artists based on result/track listed amount
    const formatArtists = (artists: { name: string }[]) => {
        if (artists.length === 1) {
            return artists.map(artist => artist.name)
        } else if (artists.length >= 2) {
            return artists.map(artist => artist.name).join(', ');
        }
        return '';
    };

    return (
        <div className="h-full w-full mt-12">
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((result) => {
                    return (
                        <Dialog>
                            <Card key={result.id}>
                                <CardHeader className="p-3 sm:p-4">
                                    <DialogTrigger asChild className="cursor-pointer">
                                        <img src={result.images[0].url} draggable="false"></img>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                        <DialogHeader>
                                            <div className="flex flex-col sm:flex-row gap-6 mt-6 md:mt-0">
                                                <img className="w-full sm:w-2/5" src={result.images[0].url} draggable="false"></img>
                                                <div className="flex flex-col gap-6 justify-center items-center sm:items-start">
                                                    <div>
                                                        <DialogTitle className="mt-4 lg:mt-0 text-2xl">
                                                            {result.name}
                                                        </DialogTitle>
                                                        <DialogDescription className="text-base">
                                                            Album by {formatArtists(result.artists)}
                                                        </DialogDescription>
                                                    </div>
                                                    <Button type="submit">
                                                        <Link to={`/record/${result.id}`}>
                                                            View Details
                                                        </Link>
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

