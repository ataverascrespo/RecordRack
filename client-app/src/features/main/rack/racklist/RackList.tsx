import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/app/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import RackListRecords from "./RackListRecords";
import { DebounceInput } from "react-debounce-input";
import RackListEmpty from "./RackListEmpty";
import NotFoundView from "@/app/layout/NotFoundView";

function RackList() {

    // Access the global Mobx stores
    const { recordStore } = useStore();
    const { savedRecords, savedRecordsSortOrder, savedRecordsSortType, savedRecordsSearchQuery } = recordStore;

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

    if (!savedRecords || savedRecords.length == 0 || savedRecords == undefined) {
        return <RackListEmpty />
    }
    else {
        return (
            <div className="w-full">
                <div className="w-full flex flex-col-reverse md:flex-row gap-2 md:gap-4">
                    <DebounceInput
                        className="flex h-10 w-full rounded-md border shadow-md border-neutral-200 bg-white px-3 py-2 text-xs md:text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
                        placeholder={"Search records..."}
                        minLength={0}
                        debounceTimeout={750}
                        value={savedRecordsSearchQuery}
                        onChange={event => searchRecords(event.target.value)}
                    />

                    <div className="w-full flex flex-row gap-2 items-center">
                        {/* Set default type to stored global type */}
                        <Select defaultValue={savedRecordsSortType} onValueChange={((value) => sortRecordsType(value))} >
                            <SelectTrigger className="shadow-md w-1/2 text-xs md:text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* Filter Items */}
                                    <SelectLabel><p className="text-base">Filter by Type</p></SelectLabel>
                                    <SelectItem value="album">View Albums</SelectItem>
                                    <SelectItem value="track">View Tracks</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select defaultValue={savedRecordsSortOrder} onValueChange={((value) => sortRecordsOrder(value))} >
                            <SelectTrigger className="shadow-md w-1/2 text-xs md:text-sm">
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
                </div>


                <div className="h-full w-full mt-12">
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {savedRecords.filter(record => record.albumType === savedRecordsSortType).length == 0 ? (
                            // If there are no records when filtered, display empty
                            <div className="w-full col-span-4">
                                <NotFoundView text={"No records found."} height={"h-[30vh] md:h-[50vh]"} />
                            </div>
                        ) : (
                            // Show records only of the selected record type, and with the search query
                            savedRecords
                                .filter(record => record.albumType === savedRecordsSortType)
                                .filter((record) => record.albumName.toLowerCase().includes(savedRecordsSearchQuery.toLowerCase()))
                                .map(record => <RackListRecords key={record.id} record={record} />)
                        )}
                    </div>
                </div>
            </div>



        )
    }
}

export default observer(RackList)
