import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Loading from "@/app/layout/Loading";
import RackListRecords from "./RackListRecords";
import RackListEmpty from "@/features/main/rack/racklist/RackListEmpty";

function RackList() {

    // Access the global Mobx stores
    const { recordStore, profileStore } = useStore();
    const { savedRecords, loadingRecords, savedRecordsSortOrder } = recordStore;
    const { viewedUserRecordType } = profileStore;

    useEffect(() => {
        //When navigating back to here i.e from Rackview, we need to unselect the viewed record.
        recordStore.unselectRecord();
    })

    const sortRecords = (sortValue: string) => {
        recordStore.sortRecords(sortValue);
    }

    // Display loading spinner while loading
    if (loadingRecords) {
        return <Loading text={"Loading records..."} height={"h-full"}></Loading>
    }
    // Display error screen if the records are null, undefined, or length of 0
    else if (!savedRecords || savedRecords == undefined || savedRecords.length === 0) {
        return <RackListEmpty />
    }
    else {
        return (
            <Tabs className="w-full mt-12 space-y-6" defaultValue={viewedUserRecordType}>

                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <TabsList className="w-full md:w-2/3 lg:w-2/5">
                        <TabsTrigger className="w-1/2" value="album">Albums</TabsTrigger>
                        <TabsTrigger className="w-1/2" value="track">Tracks</TabsTrigger>
                    </TabsList>

                    
                    <Select defaultValue={savedRecordsSortOrder} onValueChange={((value) => sortRecords(value))} >
                        <SelectTrigger className="w-full md:w-1/5">
                            <SelectValue  />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel><p className="text-base">Filter by Date</p></SelectLabel>
                                <SelectItem value="asc">Oldest first</SelectItem>
                                <SelectItem value="desc">Newest first</SelectItem> 
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

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
                                        <RackListRecords key={record.id} record={record} />
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
                                        <RackListRecords key={record.id} record={record} />
                                    )
                                })}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        )
    }
}

export default observer(RackList)

