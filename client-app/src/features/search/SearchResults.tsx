import { Album } from "@/app/models/album";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
    albums: Album[];
}


export default function SearchResults({ albums }: Props) {
    return (
        <div className="h-full w-full mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            {albums.map((album) => {
                return (
                    <Card key={album.id} className="">
                        <CardHeader>
                            <img src={album.images[0].url} draggable="false"></img>
                        </CardHeader>

                        <CardContent>
                            <CardTitle>{album.name}</CardTitle>
                            <CardDescription>
                                {album.artists.map(artist => (" " + artist.name))}
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
    )
}

