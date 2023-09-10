import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import RackList from "@/features/rack/RackList";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function SearchPage() {
    // Access the global Mobx stores
    const { searchStore } = useStore();

    return (
        <div className="container">
            <div className="h-full mt-[9.75rem] mb-24 flex flex-col justify-start gap-12 items-start ">
                {/* Your own record rack */}
                <div className="flex flex-col gap-2 items-start">
                    <h2 className="font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-neutral-400 dark:text-neutral-600">Hey username,</h2>
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">Welcome to your record rack</h1>
                </div>

                {/* <div className="flex flex-col gap-2 items-start">
                        <h2 className="font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-neutral-400 dark:text-neutral-600">Hey username,</h2>
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">This is OtherUsername's record rack</h1>
                    </div> */}

                {searchStore.searchAlbums.length != 0
                    ? <RackList results={searchStore.searchAlbums}></RackList>
                    :
                    <div className="lg:h-[50vh] z-0 mt-48 lg:mt-0 flex flex-col justify-end lg:flex-row lg:justify-start items-center">
                        <div className="flex flex-col items-center lg:items-start gap-6">
                            <h2 className="max-w-2xl mt-6 text-base lg:text-xl text-neutral-600dark:text-neutral-300">Looks like your rack is empty! Let's search for some records...</h2>
                            <NavLink to={"/search"}>
                                <Button size="lg"><p className="text-base">Search</p></Button>
                            </NavLink>
                        </div>
                        <img className="w-[15%] mt-12 lg:mt-0" src="./src/assets/empty.svg" alt="hero" draggable="false" />
                    </div>
                }
            </div>
        </div>
    )
}

export default observer(SearchPage)