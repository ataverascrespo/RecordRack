import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { useStore } from "@/app/stores/store";
import { useEffect } from "react";
import RackListRecords from "./RackListRecords";
import { observer } from "mobx-react-lite";

function RackList() {

    // Access the global Mobx stores
    const { recordStore, profileStore } = useStore();
    const { savedRecords } = recordStore;
    const { viewedUserRecordType } = profileStore;

    useEffect(() => {
        //When navigating back to here i.e from Rackview, we need to unselect the viewed record.
        recordStore.unselectRecord();
    })

    return (
        <Tabs className="w-full mt-12 space-y-6" defaultValue={viewedUserRecordType}>

            <TabsList className="w-full md:w-2/3 lg:w-1/3">
                <TabsTrigger className="w-1/2" value="album">Albums</TabsTrigger>
                <TabsTrigger className="w-1/2" value="track">Tracks</TabsTrigger>
            </TabsList>
            <TabsContent value="album" className="w-full">
                <div className="h-full w-full mt-12">
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {savedRecords
                            //Only grab albums where the record is NOT private. If user signed in, grab albums where user is signed is and record may also be private
                            .filter(record => !record.isPrivate || (profileStore.isCurrentUser && record.isPrivate))
                            //Only grab record where the type is album
                            .filter(record => record.albumType == "album")
                            .map((record) => {
                                return (
                                    // Individual record display component
                                    <RackListRecords key={record.id} record={record}/>
                                )
                            })}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="track">
                <div className="h-full w-full mt-12">
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {savedRecords
                            //Only grab record where the record is NOT private. If user signed in, grab albums where user is signed is and record may also be private
                            .filter(record => !record.isPrivate || (profileStore.isCurrentUser && record.isPrivate))
                            //Only grab record where the type is track
                            .filter(record => record.albumType == "track")
                            .map((record) => {
                                return (
                                    // Individual record display component
                                    <RackListRecords key={record.id} record={record}/>
                                )
                            })}
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default observer(RackList)

