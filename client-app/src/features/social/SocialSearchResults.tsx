/**
 * Name:  SocialSearchReuslts.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the results of searched users.
*/

import { ProfileUser } from "@/app/models/profile";
import { Link } from "react-router-dom";

// Define component props
interface Props {
    results: ProfileUser[];
    query: string;
}

function SocialSearchResults({ results, query}: Props) {
    
    if (results.length === 0 && query.length >= 4) {
        return (
            <div className="w-full h-8 xs:h-10 sm:h-16 md:h-24 lg:h-32 flex flex-col justify-center">
                <p className="w-full text-sm sm:text-base md:text-2xl text-neutral-800 text-base dark:text-neutral-50">No results found for "{query}".</p>
            </div>
        );
    }

    return results.map((result) => (
        <Link
            key={result.id}
            to={`/${result.userName}`}
            className="w-full flex flex-row items-center justify-center gap-4 md:gap-12 p-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
        >
            {/* User Profile Image */}
            <div className="flex flex-col gap-6">
                <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg">
                    <img
                        className="w-full h-full object-cover"
                        src={result.imageURL || 'https://res.cloudinary.com/dlwfuryyz/image/upload/v1695305498/album-api/jzbiw85pakr4amttznuq.jpg'}
                        alt="profile picture"
                        draggable="false"
                    />
                </div>
            </div>

            {/* User Name */}
            <div className="w-full flex flex-col items-start text-left">
                <h1 className="font-normal text-neutral-800 text-sm sm:text-base md:text-2xl leading-none dark:text-neutral-50">
                    {result.userName}
                </h1>
            </div>
        </Link>
    ));
}

export default SocialSearchResults