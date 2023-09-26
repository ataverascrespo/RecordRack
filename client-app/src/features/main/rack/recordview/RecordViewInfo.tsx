import { observer } from 'mobx-react-lite'
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Textfit } from 'react-textfit';
import RecordViewLikes from "./RecordViewLikes";
import { SavedRecord } from '@/app/models/record';

interface Props {
    record: SavedRecord,
}

function RecordViewInfo({ record }: Props) {

    /*
       Function to format the DateTime C# format to a readable format
    */
    function formatAddedDate(date: string) {
        // Parse the original date string into a Date object
        const dateObject = new Date(date);

        // Format the Date object into the desired format "YYYY-MM-DD"
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');

        // Create the formatted date string
        return `${year}-${month}-${day}`;
    }

    return (
        <div className='w-full flex flex-col gap-4 xl:gap-8 items-start'>
            {/* Name, artist, etc */}
            <div className="w-full flex flex-col items-start">
                <div className="w-full h-auto md:h-[75px]">
                    <Textfit className="h-full flex items-end" mode="multi" forceSingleModeWidth={true} min={24} max={64}>
                        <h1 className="w-full font-black text-neutral-900 leading-none dark:text-neutral-50">
                            {record.albumName}
                        </h1>
                    </Textfit>
                </div>
                <h2 className="max-w-xl text-lg md:text-2xl font-semibold text-neutral-800 text-left dark:text-neutral-100">
                    {(record.albumType).charAt(0).toUpperCase() + record.albumType.slice(1)} by {record.artistName}
                </h2>
                            <div className="flex flex-row gap-6 mt-4 w-full">
                        <RecordViewLikes id={record.id}/>
                    </div>
                <div className="flex flex-col mt-12 lg:flex-row items-start lg:items-center">
                    <h2 className="max-w-xl text-lg lg:text-xl text-neutral-800 text-left dark:text-neutral-100">
                        Released on {record.releaseDate}
                    </h2>
                    <p className="hidden lg:block mx-3 text-xl leading-0 ">&#x2022;</p>
                    <h3 className="max-w-xl text-lg lg:text-xl text-neutral-700 text-left dark:text-neutral-400">
                        Added on {formatAddedDate(record.dateAdded)}
                    </h3>
                </div>
            </div>

            {/* RECORD DESCRIPTION */}
            <div className="flex flex-row gap-12 mt-4 lg:mt-0 items-start w-full text-neutral-800 dark:text-neutral-50">
                <div className="grid w-full gap-1 pb-4">
                    <Label htmlFor="message" className="text-base text-neutral-400 text-left dark:text-neutral-600 font-bold">Record Description</Label>
                    <Textarea className="resize-none xl:h-[120px] placeholder:text-neutral-950 bg-neutral-200" placeholder={record?.albumDescription} disabled />
                </div>
            </div>
        </div>
    )
}

export default observer(RecordViewInfo)