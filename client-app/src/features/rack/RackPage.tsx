import { ThemeProvider } from "@/components/theme-provider"
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import RackList from "@/features/rack/RackList";

function SearchPage() {
    // Access the global Mobx stores
    const { searchStore } = useStore();

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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
                    <RackList results={searchStore.searchAlbums}></RackList>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default observer(SearchPage)