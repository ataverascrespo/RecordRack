/*

    This page is responsible for the main functionality of this app.
    Splits off into two seperate features - profile and rack

*/
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import RackList from "@/features/main/rack/racklist/RackList";
import ProfilePage from "./profile/ProfilePage";
import Loading from "@/app/layout/Loading";
import NotFoundView from "@/app/layout/NotFoundView";

function RackPage() {
    // Get the browser params
    const params = useParams();
  
    // Access the global Mobx stores
    const { recordStore, userStore, profileStore } = useStore();
    const { isCurrentUser, viewedUser } = profileStore;

    useEffect(() => {
        const checkUser = async () => {
            if (params.username) {
                //If the loaded user profile is the stored view user, there's no need to re-fetch user data.
                if (params.username === viewedUser?.userName) {
                    return;
                }
                //If the logged in user is the url params, there's no need to re-fetch user data.
                if (params.username === userStore.user!.userName) {
                    await profileStore.setViewedUser(userStore.user!)
                    return;
                } else {
                    // If the current viewed user is not the current user, we need to fetch that user
                    await profileStore.getViewedUser(params.username);
                    return;
                }
            }
        }

        checkUser();
    }, [params.username]);

    useEffect(() => {
        const loadRecords = async () => {
            if (profileStore.viewedUser) {
                if (isCurrentUser) {
                    // Fetch the logged in user's list.
                    await recordStore.loadRecords();
                } else {
                    // Fetch the user's list based on the user ID
                    await recordStore.loadRecordsForUser(profileStore.viewedUser.id)
                }
            }
        }
        loadRecords();
    }, [profileStore.viewedUser]);

    
    // Display loading spinner while loading
    if (profileStore.loadingViewedUser) return <Loading text={"Loading user profile..."} height={"h-screen"}></Loading>
    // Display error screen if the viewed user fetch returns null.
    else if (!profileStore.viewedUser) return <NotFoundView text={"That user could not be found!"} height={"h-screen"}></NotFoundView>
    else {
        return (
            <div className="container">
                <div className="h-full mt-[13.5rem] mb-24 flex flex-col justify-start gap-12 items-start ">
    
                    {/* Profile View*/}
                    <ProfilePage></ProfilePage>
    
                    {/* Rack List */}
                    <RackList></RackList>
                </div>
            </div>
        )
    }
    
}

export default observer(RackPage)