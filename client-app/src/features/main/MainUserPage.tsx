/*

    This page is responsible for the main functionality of this app.
    Splits off into two seperate features - profile and rack

*/
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import RackList from "@/features/main/rack/RackList";
import ProfilePage from "./profile/ProfilePage";
import Loading from "@/app/layout/Loading";
import NotFoundView from "@/app/layout/NotFoundView";
import RackListEmpty from "./rack/RackListEmpty";

function RackPage() {
    // Get the browser params
    const params = useParams();
  
    // Access the global Mobx stores
    const { recordStore, userStore, profileStore } = useStore();
    const { savedRecords } = recordStore;
    const { isCurrentUser, viewedUser } = profileStore;

    useEffect(() => {
        if (params.username) {

            //If the loaded user profile is the stored view user, there's no need to re-fetch user data.
            if (params.username === viewedUser?.userName) {
                console.log("This user was already fetched. Just display their list!");
                return;
            }
            if (isCurrentUser) {
                profileStore.setViewedUser(userStore.user!)
            } else {
                // If the current viewed user is not the current user, we need to fetch that user
                profileStore.getViewedUser(params.username);
            }
        }
    }, [params.username]);

    useEffect(() => {
        if (profileStore.viewedUser) {
            if (isCurrentUser) {
                // Fetch the logged in user's list.
                recordStore.loadRecords();
            } else {
                // Fetch the user's list based on the user ID
                recordStore.loadRecordsForUser(profileStore.viewedUser.id)
            }
        }
    }, [profileStore.viewedUser]);

    // Display loading spinner while loading
    if (profileStore.loadingViewedUser) return <Loading text={"Loading user profile..."}></Loading>
    // Display error screen if the viewed user fetch returns null.
    if (!profileStore.viewedUser) return <NotFoundView text={"That user could not be found!"}></NotFoundView>

    return (
        <div className="container">
            <div className="h-full mt-[13.5rem] mb-24 flex flex-col justify-start gap-12 items-start ">

                {/* Profile View*/}
                <ProfilePage></ProfilePage>

                {/* Rack List */}
                {savedRecords.length != 0
                    ? <RackList></RackList>
                    : <RackListEmpty></RackListEmpty>
                }
            </div>
        </div>
    )
}

export default observer(RackPage)