import { ProfileUser } from '@/app/models/profile';
import { SavedRecord } from '@/app/models/record';
import { Button } from '@/components/ui/button'
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
    user: ProfileUser;
    record: SavedRecord;
}

function RecordViewImage({user, record}: Props) {
    const navigate = useNavigate();
    const params = useParams();

    /*
        Function to handle back navigation on rack view page
    */
    function handleBackNavigation() {
        //If the user navigated to rack page via URL. 
        if (user.userName != params.username) {
            navigate(`/${params.username}/profile`)
        }
        //if user navigated to rack page via rack list
        else {
            navigate(-1);
        }
    }
    
  return (
    <div className="flex flex-col mt-28 w-full sm:w-3/4 md:w-2/3 gap-6 items-start justify-between lg:justify-center sm:self-start lg:self-center">

        <Button variant={"secondary"} onClick={() => handleBackNavigation()}>
            <p className="text-base">Back to {params.username}'s record rack</p>
        </Button>
        <img
            className="mt-0 rounded-xl shadow-lg"
            src={record.photoURL}
            alt="hero"
            draggable="false"
        />
    </div>
  )
}

export default observer(RecordViewImage)