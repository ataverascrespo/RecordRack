import { ProfileUser } from "@/app/models/profile";
import { Link } from "react-router-dom";

interface Props {
    results: ProfileUser[];
}

function SocialSearchResults({ results }: Props) {
    return (
        <div className="flex flex-col w-full">
            {/* Map the resulting users to the component */}
            {results.map((result) => (
                <Link key={result.id} to={`/${result.userName}/profile`} className="flex flex-row items-center justify-center gap-4 md:gap-12 border-t-2 p-4 md:p-6 hover:bg-neutral-100 dark:hover:bg-neutral-950 transition-all duration-300">

                    {/* Image */}
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

                    {/* Name*/}
                    <div className="w-full flex flex-col items-start text-left">
                        <h1 className="font-medium text-neutral-800 text-sm sm:text-base md:text-2xl lg:text-3xl leading-none dark:text-neutral-50">
                            {result.userName}
                        </h1>
                    </div>
                    
                </Link>
            ))}
        </div>
    )
}

export default SocialSearchResults