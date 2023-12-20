/**
 * Name: NotificationCard.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file accepts props to render and display the individually mapped user notifications.
*/

import { ProfileUserNotification } from "@/app/models/profile";
import { useStore } from "@/app/stores/store";
import { Link } from "react-router-dom";

// Define the component props of type SavedRecord
interface Props {
    notification: ProfileUserNotification;
}

function NotificationCard({ notification }: Props) {
    // Access the global Mobx stores
    const { userStore } = useStore();

    /*
       Function to format the DateTime C# format to a readable format
    */
    function formatNotificationDate(date: string) {
        // Parse the original date string into a Date object
        const dateObject = new Date(date);

        // Format the Date object into the desired format "YYYY-MM-DD"
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');

        // Create the formatted date string
        return `${year}-${month}-${day}`;
    }

    var notificationText;

    if (notification.type === "UserFollowing") {
        // Type is a follow notification
        notificationText = "followed you"
    }
    else {
        // Type is a record like notification
        notificationText = `liked your saved ${notification.album.albumType} ${notification.album.albumName} by ${notification.album.artistName}`
    }

    return (
        // Wrap the component in a link to the record view URL
        <div key={notification.albumID} className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 p-4 md:p-6">

                {/* User Profile Image */}
                <Link to={`/${notification.user.userName}`}>
                    <div className="flex flex-col gap-6">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg hover:opacity-75 transition-all duration-100">
                            <img
                                className="w-full h-full object-cover"
                                src={notification.user.imageURL || 'https://res.cloudinary.com/dlwfuryyz/image/upload/v1695305498/album-api/jzbiw85pakr4amttznuq.jpg'}
                                alt="profile picture"
                                draggable="false"
                            />
                        </div>
                    </div>
                </Link>

                <div className="w-full flex flex-col items-start text-left gap-2 md:gap-4">
                    {/* Track and artist name */}
                    <div>
                        <div className="text-xs xxxs:text-sm md:text-base lg:text-lg xl:text-xl font-normal leading-none tracking-tight">
                            <span>
                                <Link className="font-bold hover:text-neutral-400 transition-all duration-100" to={`/${notification.user.userName}`}>{notification.userName}</Link> {notificationText}
                            </span>
                        </div>
                        <h2 className="text-xs md:text-sm lg:text-base text-neutral-400 dark:text-neutral-600">
                            {formatNotificationDate(notification.time)}
                        </h2>
                    </div>
                </div>
            </div>

            {
                (notification.album == null)  
                    // If no album was passed, display nothing
                    ? <div/>
                    : 
                    // Display album image with link if exists
                    <Link to={`/${userStore.user?.userName}/record/${notification.albumID}`}>
                        <div className="flex flex-col gap-6">
                            <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-sm md:rounded-lg overflow-hidden shadow-lg hover:opacity-75 transition-all duration-100">
                                <img
                                    className="w-full h-full object-cover"
                                    src={notification.album.photoURL}
                                    alt="profile picture"
                                    draggable="false"
                                />
                            </div>
                        </div>
                    </Link>
            }
            
        </div>
    )
}

export default NotificationCard