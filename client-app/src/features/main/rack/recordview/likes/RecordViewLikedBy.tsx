/**
 * Name: RecordViewLikedBy.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the list of users who have liked a specified record.
*/

import NotFoundView from '@/app/layout/NotFoundView';
import { ProfileUser } from '@/app/models/profile';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

// Define component props
interface Props {
    usersLiked: ProfileUser[];
}

function RecordViewLikedBy({ usersLiked }: Props) {
    
    // Render this if the amount of liked users is 0.
    if (usersLiked.length == 0) {
        return (
            <div className="h-72 flex flex-row justify-center">
                {/* Render the Not Found component */}
                <NotFoundView text={'No likes'} height={'h-full'} />
            </div>
        )
    }
    // Render this if the amount of liked users is not 0.
    else {
        return (
            <div className="p-4">
                {/* Map users to individual renders */}
                {usersLiked.map((user) => (
                    <div key={user.id}>
                        <div className="text-sm">
                            {/* Link to the mapped user's profile*/}
                            <Link className="items-center hover:brightness-110 dark:hover:brightness-90 transform duration-100"
                                to={`/${user.userName}`}>
                                <div className='flex flex-row items-center justify-start gap-6'>
                                    <img
                                        src={user.imageURL || 'https://res.cloudinary.com/dlwfuryyz/image/upload/v1695305498/album-api/jzbiw85pakr4amttznuq.jpg'}
                                        alt="user"
                                        className='h-10 w-10 rounded-full'
                                    />
                                    {user.userName}
                                </div>
                            </Link>
                        </div>
                        <Separator className="my-4" />
                    </div>
                ))}
            </div>)
    }
}

export default RecordViewLikedBy