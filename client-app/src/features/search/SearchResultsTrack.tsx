import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SpotifyTrack } from "@/app/models/spotifyTrack";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"

// Define the component props
interface Props {
    results: SpotifyTrack[];
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
            {results.length > 0 ? (
                <h2 className="text-lg md:text-2xl text-right font-light">Track Results ({results.length})</h2> 
            ) : (
                <h2></h2>
            )}
            <h2></h2>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((result) => {
                    return (
                        <Card key={result.id} className="">
                            <CardHeader>
                                <img src={result.album.images[0].url} draggable="false"></img>
                            </CardHeader>

                            <CardContent>
                                <CardTitle>{result.name}</CardTitle>
                                <CardDescription>
                                    {formatArtists(result.album.artists)}
                                </CardDescription>
                            </CardContent>

                            {/* Opens dialog for sending to back-end */}
                            <CardFooter>
                                <div className="md:w-1/2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Add to Rack</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                            <DialogHeader>
                                                <DialogTitle className="mt-4 lg:mt-0">Adding track '{result.name}' by {formatArtists(result.album.artists)} </DialogTitle>
                                                <DialogDescription>
                                                    This track will be added to your racklist.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <Label htmlFor="message">Track Description</Label>
                                                <Textarea placeholder="Add some additional notes or thoughts about the track." />
                                                <Label htmlFor="private">Set as Private?</Label>
                                                <Switch id="private" />
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Add to Rack</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

