"use client"
import { DebounceInput } from 'react-debounce-input';
import { useToast } from "@/components/ui/use-toast"

//Model imports
import { useStore } from "@/app/stores/store"

export function SocialForm() {
    // Access the global Mobx stores
    const { profileStore } = useStore();

    //Initialize the toast notification
    const { toast } = useToast()

    /*
        Define form submission handler for album
    */
    const searchUser = async (query: string) => {
        //if the search params are empty, set the search to empty
        if (query.length === 0) {
            profileStore.setSearchedUsers([]);
        }
        //if the search params are 4 or greater, start searching
        //This is just some performance optimization. Usernames are a min of 6 strings so no need to search way before that
        else if (query.length >= 4) {
            try {
                const response = await profileStore.searchUsers(query);
                if (response.success === true) {
                    //Successful search, set the users
                    profileStore.setSearchedUsers(response.data);
                } else {
                    //Empty search toast
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: response.returnMessage
                    })
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                })
                throw (error);
            }
        }
    }

    return (
        <div className="w-full lg:w-2/3 h-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-row gap-4 items-center justify-start">
                <DebounceInput
                    className="flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
                    placeholder={"Search for a user..."}
                    minLength={5}
                    debounceTimeout={750}
                    value={profileStore.searchQuery}
                    onChange={event => searchUser(event.target.value)}
                    />
            </div>
        </div>
    )
}