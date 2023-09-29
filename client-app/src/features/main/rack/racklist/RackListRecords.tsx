import { SavedRecord } from "@/app/models/record";
import { useStore } from "@/app/stores/store";
import { Card, CardHeader, } from "@/components/ui/card"
import { Link } from "react-router-dom";

interface Props {
    record: SavedRecord;
}

function RackListRecords({ record }: Props) {
     // Access the global Mobx stores
    const { profileStore } = useStore();
    const { viewedUser } = profileStore;

    return (
        <Link key={record.id} to={`/${viewedUser!.userName}/record/${record.id}`}>
            <Card className="shadow-md hover:shadow-xl hover:brightness-90 dark:hover:brightness-110 transition-all transform   duration-200">
                <CardHeader className="p-0">
                    <img
                        src={record.photoURL}
                        draggable="false"
                        className="rounded-md"
                        loading="lazy"/>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default RackListRecords