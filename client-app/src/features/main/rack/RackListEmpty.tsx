import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { useStore } from "@/app/stores/store";


function RackListEmpty() {
    const { userStore } = useStore();
    const { user, viewedUser } = userStore;

    // Display this component if the viewed user and logged in user are the same 
    // Meaning user is viewing their own profile
    if ((user && viewedUser) && user.userName === viewedUser.userName) {
        return (
            <div className="lg:h-[33vh] z-0 lg:mt-12 flex flex-col justify-end lg:flex-row lg:justify-center items-start">
                <div className="flex flex-col items-start gap-6">
                    <h2 className="max-w-2xl mt-6 text-base lg:text-xl text-neutral-400 dark:text-neutral-700">
                        Looks like your rack is empty! Let's search for some records...
                    </h2>
                    <Link to={"/search"}>
                        <Button variant="secondary" size="lg"><p className="text-base text-neutral-600 dark:text-neutral-400">Search</p></Button>
                    </Link>
                </div>
                <img className="hidden lg:flex w-[15%] mt-12 lg:mt-0" src="/src/assets/empty.svg" alt="hero" draggable="false" />
            </div>
        )
    }
    // Display this component if the viewed user and logged in user are not the same 
    // Meaning user is viewing someone else's profile
    else {
        return (
            <div className="lg:h-[33vh] z-0 lg:mt-12 flex flex-col justify-end lg:flex-row lg:justify-center items-start">
                <div className="flex flex-col items-start gap-6">
                    <h2 className="max-w-2xl mt-6 text-base lg:text-xl text-neutral-400 dark:text-neutral-700">
                        Looks like {viewedUser?.userName}'s rack is empty!
                    </h2>
                </div>
                <img className="hidden lg:flex w-[15%] mt-12 lg:mt-0" src="/src/assets/empty.svg" alt="hero" draggable="false" />
            </div>
        )
    }
}

export default RackListEmpty

