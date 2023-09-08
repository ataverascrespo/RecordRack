import { SpotifyAlbum } from "@/app/models/spotifyAlbum";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
            {results.length > 0 ? (
                <h2 className="text-2xl text-right font-light">Album Results ({results.length})</h2> 
            ) : (
                <h2></h2>
            )}
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
                {results.map((result) => {
                    return (
                        <Card key={result.id} className="">
                            <CardHeader>
                                <img src={result.images[0].url} draggable="false"></img>
                            </CardHeader>

                            <CardContent>
                                <CardTitle>{result.name}</CardTitle>
                                <CardDescription>
                                    {formatArtists(result.artists)}
                                </CardDescription>
                            </CardContent>

                            <CardFooter>
                                <div className="md:w-1/2">
                                    <Button>Add to Rack</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

