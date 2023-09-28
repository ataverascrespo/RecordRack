import { observer } from "mobx-react-lite";
import { SocialForm } from "./SocialForm";
import { useStore } from "@/app/stores/store";
import SocialSearchResults from "./SocialSearchResults";
import Footer from "@/app/layout/Footer";

function SocialPage() {
    // Access the global Mobx stores
    const { profileStore } = useStore();
    const { searchedUsers } = profileStore;

    return (
        <div className="container">
            <div className="h-full mt-48 mb-96 flex flex-col justify-start gap-12 items-start">

                <div className="flex flex-col gap-4 items-start">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-50">
                        Connect with other music lovers
                    </h1>
                </div>

                {/* Form component */}
                <SocialForm />
                {/* Form search results component */}
                <SocialSearchResults results={searchedUsers}/>
            </div>
            <Footer/>
        </div>
    )
}

export default observer(SocialPage)