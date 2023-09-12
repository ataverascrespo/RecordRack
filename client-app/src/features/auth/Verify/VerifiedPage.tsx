import { observer } from "mobx-react-lite";
import { NavLink, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "@/app/stores/store";
import { UserVerify } from "@/app/models/user";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";


function VerifiedPage() {
    const { toast } = useToast()

    const { userStore } = useStore();
    const [verificationToken] = useState<UserVerify>({ token: "" });
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

    //Get the token from the provided URL search parameters 
    //i.e /verified?=E998C4461E2C3D26FA6BF63077C53C200613B87A5
    const [searchParams] = useSearchParams();
    const token = searchParams.get("");

    useEffect(() => {
        if (token !== null) {
            //Set the state of the verification token 
            verificationToken.token = token!;

            verifyToken(verificationToken)
                .catch((error) => {
                    console.error("Error verifying token:", error);
                });
        }
        else {
            setIsTokenValid(false); // Token is null
        }
    }, [token]);


    /* 
        Function to check that the token is valid for verification
    */
    const verifyToken = async (values: UserVerify) => {
        try {
            const response: any = await userStore.verify(values);

            //If the success field is true, set valid
            if (response.success === true) {
                setIsTokenValid(true);
            } else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: response.response.data.returnMessage,
                })
                //If the success field is false, set valid
                setIsTokenValid(false);
            }
        } catch (error) {
            throw error;
        }
    };


    // If the token is not created yet, display loading indicator
    if (isTokenValid === null) {
        return <h2>Loading...</h2>;
    }
    //If the token is not valid, display error
    else if (!isTokenValid) {
        return (
            <div className="container">
                <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">
                    {/* header */}
                    <div className="flex flex-col gap-8 items-center text-neutral-800 dark:text-neutral-50">
                        <div className="flex flex-col items-center  text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Not Verified</h1>
                            <h2 className="max-w-xl text-2xl font-light "> There was an issue verifying your account. Ensure that the token is valid and has not expired. </h2>
                        </div>
                        <img className="mt-8 w-full md:w-2/3 lg:w-1/2" src="./src/assets/not-verified.svg" alt="verification sent" draggable="false" />
                    </div>
                </div>
            </div>
        )
    }
    //If the token is valid, display success
    else {
        return (
            <div className="container">
                <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">
                    {/* header */}
                    <div className="flex flex-col gap-8 items-center text-neutral-800 dark:text-neutral-50">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold">Verified</h1>
                            <h2 className="text-2xl font-light mb-4 "> Your account has been verified - you're good to go. </h2>
                            <NavLink to={"/login"}>
                                <Button size="lg"><p className="text-base">Login</p></Button>
                            </NavLink>
                        </div>
                        <img className="mt-8 w-full md:w-2/3 lg:w-1/2" src="./src/assets/verified.svg" alt="verification sent" draggable="false" />
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(VerifiedPage)