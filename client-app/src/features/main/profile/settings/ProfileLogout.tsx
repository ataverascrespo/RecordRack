/**
 * Name: ProfileLogout.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file is the parent component for logging a user out.
*/

import { useStore } from "@/app/stores/store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { observer } from "mobx-react-lite"

function ProfileLogout() {
    // Access the global Mobx stores
    const { userStore } = useStore();
    //Initialize toast component
    const { toast } = useToast();

    /*
        Function to log the current user out
    */
    const handleLogout = async () => {
        try {
            const response: any = await userStore.logout()
            //If the success field is true, display success toast
            if (response.success === true) {
                toast({
                    title: 'Logged user out.',
                })
            }
            //If the success field is false, display error msg toast
            else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: "Could not log you out at this time.",
                })
            }
        } catch (error) {
            //If there is no response at all, display general error
            toast({
                variant: "destructive",
                title: "Oh no! Something went wrong.",
                description: "Please try again later.",
            })
            throw (error)
        }
    }

    return (
        <div className="h-full flex my-12 flex-col justify-center gap-8 items-start">
            {/* Page header */}
            <div className="flex flex-col gap-8 w-full">
                <h2 className="text-sm xxs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-neutral-800 dark:text-neutral-50">Are you sure you want to log out of Record Rack?</h2>
                <Button onClick={handleLogout} className="w-full shadow-md">Yes, log me out.</Button>
            </div>
        </div>
    )
}

export default observer(ProfileLogout)