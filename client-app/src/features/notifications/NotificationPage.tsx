/**
 * Name: NotificationPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders and configures the parent display for user notifications.
*/

import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";
import Loading from "@/app/layout/Loading";
import { useEffect } from "react";
import NotificationList from "./NotificationList";

function NotificationPage() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { loadingNotifications } = profileStore;

    // Second use effect hook - render records after user validated
    useEffect(() => {
        const loadNotifications = async () => {
            // Fetch the user's notifications list based
            await profileStore.getNotifications();
        }
        loadNotifications();
    }, [profileStore]);

    return (
        <div className="container">
            <div className="h-full w-full mt-48 mb-24 flex flex-col justify-start gap-12 items-start">

                {/* Header */}
                <div className="flex flex-col gap-4 items-start">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">
                        Your notifications
                    </h1>
                </div>

                {
                    loadingNotifications
                    // While users are loading, display a loading component
                        ? <Loading text={"Loading..."} height={"h-[40vh]"}></Loading>
                        : 
                    // When users have loaded, render the search results
                        <NotificationList></NotificationList>
                }
                
            </div>
        </div>
    )
}

// Wrap component in observer so that it reacts to MobX state changes
export default observer(NotificationPage)