import { Card, CardHeader, } from "@/components/ui/card"
import { Link } from "react-router-dom";
import { useStore } from "@/app/stores/store";
import { useEffect } from "react";

function RackList() {

    // Access the global Mobx stores
    const { recordStore, profileStore } = useStore();
    const { savedRecords } = recordStore;
    const { viewedUser } = profileStore;

    useEffect(() => {
        recordStore.unselectRecord();
    })
    
    return (
        <div className="h-full w-full mt-12">
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {savedRecords.map((record) => {
                    return (
                        <Link key={record.id} to={`/${viewedUser!.userName}/record/${record.id}`}>
                            <Card className="shadow-md hover:shadow-xl hover:brightness-90 dark:hover:brightness-110 transition-all transform   duration-200">
                                <CardHeader className="p-0">
                                    <img
                                        src={record.photoURL}
                                        draggable="false"
                                        className="rounded-md">
                                    </img>
                                </CardHeader>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default RackList

