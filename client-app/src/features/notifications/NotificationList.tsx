/**
 * Name: NotificationPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders and configures the parent display for searching the user accounts.
*/


import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";
import Footer from "@/app/layout/Footer";
import NotFoundView from "@/app/layout/NotFoundView";
import NotificationCard from "./NotificationCard";

function NotificationList() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUserNotifications } = profileStore;

    return (
        <div className="h-full w-full flex flex-col justify-start gap-12 items-start">
            {
                (viewedUserNotifications === undefined || viewedUserNotifications.length === 0)  
                // While users are loading, display a loading component
                    ? <NotFoundView text={"No notifications found."} height={"h-[40vh]"}></NotFoundView>
                    : 
                    // When users have loaded, render the search results
                    <div className="h-full w-full">
                        {viewedUserNotifications
                        .map(notification => <NotificationCard notification={notification}></NotificationCard>)}
                    </div>
            }
        </div>
    )
}

// Wrap component in observer so that it reacts to MobX state changes
export default observer(NotificationList)