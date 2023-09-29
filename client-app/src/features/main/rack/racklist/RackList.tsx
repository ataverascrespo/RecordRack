import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Loading from "@/app/layout/Loading";
import RackListRecords from "./RackListRecords";
import { DebounceInput } from "react-debounce-input";
import NotFoundView from "@/app/layout/NotFoundView";
import RackListEmpty from "./RackListEmpty";

function RackList() {

    // Access the global Mobx stores
    const { recordStore, profileStore } = useStore();
    const { savedRecords, filteredRecords, loadingRecords, savedRecordsSortOrder } = recordStore;
    const { viewedUserRecordType } = profileStore;

    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        //When navigating back to here i.e from Rackview, we need to unselect the viewed record.
        recordStore.unselectRecord();
    })

    // Whenever savedRecords or searchQuery changes, update the filteredRecords
    useEffect(() => {
        // Filter the savedRecords array based on the search query
        const filtered = recordStore.savedRecords
            .filter((record) => !record.isPrivate || (profileStore.isCurrentUser && record.isPrivate))
            .filter((record) =>
                record.albumName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        recordStore.setFilteredRecords(filtered);
        recordStore.sortRecords(savedRecordsSortOrder);
    }, [searchQuery, recordStore.savedRecords]);


    /*
        Function to sort the records
    */
    const sortRecords = (sortValue: string) => {
        recordStore.sortRecords(sortValue);
    }

    /*
        Function to set the search query to filter the records
    */
    const searchRecords = (queryValue: string) => {
        setSearchQuery(queryValue);
    }

    // Display loading spinner while loading
    if (loadingRecords) {
        return <Loading text={"Loading records..."} height={"h-full"}></Loading>
    }
    //Display empty if retrieved records from DB are empty
    else if (!savedRecords || savedRecords.length == 0 || savedRecords == undefined) {
        return <RackListEmpty/>
    }
    else {
        console.log('get out');
        return (
            <Tabs className="w-full mt-12 space-y-6" defaultValue={viewedUserRecordType}>

                <TabsList className="w-full md:w-3/4 lg:w-2/5 shadow-sm">
                    <TabsTrigger className="w-1/2" value="album">Albums</TabsTrigger>
                    <TabsTrigger className="w-1/2" value="track">Tracks</TabsTrigger>
                </TabsList>

                <div className="flex flex-row justify-between gap-4">
                    <DebounceInput
                        className="flex h-10 w-1/2 xxs:w-3/5 md:w-3/4 rounded-md border shadow-md border-neutral-200 bg-white px-3 py-2 text-xs md:text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
                        placeholder={"Search records..."}
                        minLength={0}
                        debounceTimeout={750}
                        value={searchQuery}
                        onChange={event => searchRecords(event.target.value)}
                    />

                    {/* Set default type to stored global type */}
                    <Select defaultValue={savedRecordsSortOrder} onValueChange={((value) => sortRecords(value))} >
                        <SelectTrigger className="shadow-md w-1/2 xxs:w-2/5 md:w-1/5 text-xs md:text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* Filter Items */}
                                <SelectLabel><p className="text-base">Filter by Date</p></SelectLabel>
                                <SelectItem value="asc">Oldest first</SelectItem>
                                <SelectItem value="desc">Newest first</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* ALBUMS */}
                <TabsContent value="album" className="w-full">
                    <div className="h-full w-full mt-12">
                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">     
                            {filteredRecords.filter(record => record.albumType === "album").length == 0 ? (
                                // If there are no records when filtered, display empty
                               <div className="w-full col-span-4">
                                    <NotFoundView text={"No records found."} height={"h-[30vh] md:h-[50vh]"}/>
                                </div>
                            ) : (
                                // Show records where the  type is album
                                filteredRecords
                                    .filter(record => record.albumType === "album")
                                    .map(record => <RackListRecords key={record.id} record={record} />)
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* TRACKS */}
                <TabsContent value="track">
                    <div className="h-full w-full mt-12">
                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredRecords.filter(record => record.albumType === "track").length == 0 ? (
                                // If there are no records when filtered, display empty
                                <div className="w-full col-span-4">
                                    <NotFoundView text={"No records found."} height={"h-[30vh] md:h-[50vh]"}/>
                                </div>
                            ) : (
                                //Only get records where type is track
                                filteredRecords
                                    .filter(record => record.albumType === "track")
                                    .map(record => <RackListRecords key={record.id} record={record} />)
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        )
    }
}

export default observer(RackList)
