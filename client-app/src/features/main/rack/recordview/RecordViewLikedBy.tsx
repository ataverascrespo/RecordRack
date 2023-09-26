import { ProfileUser } from '@/app/models/profile';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface Props {
    usersLiked: ProfileUser[];
}

function RecordViewLikedBy({usersLiked}: Props) {
    return (
        <div className="p-4">
            {usersLiked.map((user) => (
                <>
                    <div key={user.id} className="text-sm">
                        <Link className="items-center hover:brightness-110 dark:hover:brightness-90 transform duration-100"
                            to={`/${user.userName}/profile`}>
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
                </>
            ))}
        </div>)
}

export default RecordViewLikedBy