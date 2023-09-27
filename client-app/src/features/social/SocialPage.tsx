import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { DebounceInput } from 'react-debounce-input';
import { Button } from "@/components/ui/button";

function SocialPage() {

    const [value, setValue] = useState("")

    useEffect(() => {
    }, []);

    return (
        <div className="container">
            <div className="h-full mt-48 mb-24 flex flex-col justify-start gap-12 items-start">

                <div className="flex flex-col gap-4 items-start">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">
                        Connect with other music lovers
                    </h1>
                </div>

                <div className="w-full lg:w-2/3">
                    <div className="flex flex-row gap-4 items-center justify-start">
                        <DebounceInput
                            className="flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
                            placeholder={"Search for a user..."}
                            minLength={5}
                            debounceTimeout={500}
                            onChange={event => setValue(event.target.value)} />
                        <Button className="px-3 lg:px-8" type="submit" size="lg"><p className="text-sm md:text-base">Search</p></Button>
                    </div>
                </div>
                <p>Value: {value}</p>

            </div>
        </div>
    )
}

export default observer(SocialPage)