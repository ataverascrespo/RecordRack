/**
 * Name: ProfileButtons.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file displays the buttons for the user profile page.
 *          The button content is dynamic based on whether the user is signed in or not. 
*/

import { useStore } from "@/app/stores/store";
import { Menu } from "lucide-react";
import ProfileFollowButton from "./buttons/ProfileFollowButton";
import ProfileSettingsButton from "./buttons/settings/ProfileSettingsButton";
import ProfileShareButton from "./buttons/ProfileShareButton";

// Define component icons
export const Icons = {
    settings: Menu,
};

function ProfileButtons() {
    const { profileStore } = useStore();
    const { isCurrentUser } = profileStore;

    // If the profile user is the logged in user, display content specific to that user's own profile
    if (isCurrentUser) {
        return (
            <div className="w-full flex flex-row gap-2">
                {/* Settings button */}
                <ProfileSettingsButton />

                {/* Share profile button */}
                <ProfileShareButton user={profileStore.viewedUser!}/>
            </div>
        )
    } 
    // If the viewed user is not the logged in user, display content specific to other users
    else {
        return (
            <div className="w-full flex flex-row gap-2">
                <ProfileFollowButton buttonText={"Follow User"} width={"w-full md:w-1/3 lg:w-1/4"} />

                {/* Share profile button */}
                <ProfileShareButton user={profileStore.viewedUser!}/>
            </div>
        )
    }
}

export default ProfileButtons