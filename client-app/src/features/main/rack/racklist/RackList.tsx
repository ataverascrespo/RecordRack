/**
 * Name: RackList.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the component that fetches the records and configures their display.
 *          It also displays the UI responsible for triggering debounced search and filter logic.
*/

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { useStore } from "@/app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import RackListRecords from "./RackListRecords";
import { DebounceInput } from "react-debounce-input";
import NotFoundView from "@/app/layout/NotFoundView";
import Loading from "@/app/layout/Loading";
import RackListRecordsTracks from "./RackListRecordsTracks";

function RackList() {
    // Access the global Mobx stores
    const { recordStore } = useStore();
    const { savedRecords, loadingRecords, savedRecordsSortOrder, savedRecordsSortType, savedRecordsSearchQuery } = recordStore;

    useEffect(() => {
        //When navigating back to here i.e from Rackview, we need to unselect the viewed record.
        recordStore.unselectRecord();
    })

    /*
        Function to sort the records by their order type (oldest, newest)
    */
    const sortRecordsOrder = (sortValue: string) => {
        recordStore.sortRecordsOrder(sortValue);
    }

    /*
        Function to sort the records by their type (album, track)
    */
    const sortRecordsType = (sortValue: string) => {
        recordStore.sortRecordsType(sortValue);
    }

    /*
        Function to set the search query to filter the records
    */
    const searchRecords = (queryValue: string) => {
        recordStore.setRecordsSearchQuery(queryValue);
    }

    // When the records are loading, return a loading view
    // Prevents the wrong records from being shown on page load 
    if (loadingRecords) {
        return (
            <div className="h-full w-full">
                <Loading text={"Loading records"} height={"h-[100vh]"}></Loading>
            </div>
        )
    }
    // Render this when the records are loaded
    else {
        return (
            <div className="w-full">
                

                <Tabs className="w-full" defaultValue={savedRecordsSortType} onValueChange={((value) => sortRecordsType(value))}>
                    <TabsList className="w-full md:w-2/3 lg:w-1/3 mb-2 md:mb-6">
                        <TabsTrigger className="w-1/2" value="album">Albums</TabsTrigger>
                        <TabsTrigger className="w-1/2" value="track">Tracks</TabsTrigger>
                    </TabsList>

                    <div className="w-full flex flex-row gap-2 md:gap-4">
                        {/* Search input with debounced timeout. OnChange event only triggers after timeout */}
                        <DebounceInput
                            className="flex h-10 w-full rounded-md border shadow-inner border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
                            placeholder={"Search records..."}
                            minLength={0}
                            debounceTimeout={750}
                            value={savedRecordsSearchQuery}
                            onChange={event => searchRecords(event.target.value)}
                        />
                       
                        {/* Select tab with order by date filter */}
                        <Select defaultValue={savedRecordsSortOrder} onValueChange={((value) => sortRecordsOrder(value))} >
                            <SelectTrigger className="shadow-md w-1/2 text-xs sm:text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* Filter Items */}
                                    <SelectLabel><p className="text-base">Filter by Date</p></SelectLabel>
                                    <SelectItem value="asc">Oldest</SelectItem>
                                    <SelectItem value="desc">Newest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>
                    
                    {/* Render component and records for ALBUMS */}
                    <TabsContent value="album" className="w-full">
                        <div className="h-full w-full mt-12">
                            <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
                                {savedRecords.filter(record => record.albumType === savedRecordsSortType).length == 0 ? (
                                    // If there are no records when filtered, display empty
                                    <div className="w-full col-span-4">
                                        {/* Render NotFoundView component */}
                                        <NotFoundView text={"No albums found."} height={"h-[30vh] md:h-[50vh]"} />
                                    </div>
                                ) : (
                                    // Show records only of the selected record type, and with the search query included
                                    savedRecords
                                        .filter(record => record.albumType === savedRecordsSortType)
                                        .filter((record) => record.albumName.toLowerCase().includes(savedRecordsSearchQuery.toLowerCase()))
                                        .map(record => <RackListRecords key={record.id} record={record} />)
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Render component and records for TRACKS */}
                    <TabsContent value="track">
                        <div className="h-full w-full mt-12">
                            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2">
                                {savedRecords.filter(record => record.albumType === savedRecordsSortType).length == 0 ? (
                                    // If there are no records when filtered, display empty
                                    <div className="w-full col-span-4">
                                        {/* Render NotFoundView component */}
                                        <NotFoundView text={"No tracks found."} height={"h-[30vh] md:h-[50vh]"} />
                                    </div>
                                ) : (
                                    // Show records only of the selected record type, and with the search query included
                                    savedRecords
                                        .filter(record => record.albumType === savedRecordsSortType)
                                        .filter((record) => record.albumName.toLowerCase().includes(savedRecordsSearchQuery.toLowerCase()))
                                        .map(record => <RackListRecordsTracks key={record.id} record={record} />)
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        )
    }
}

// Wrap component in observer to respond to MobX state changes
export default observer(RackList)
