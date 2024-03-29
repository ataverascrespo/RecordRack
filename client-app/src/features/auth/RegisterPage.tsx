/**
 * Name: RegisterPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the page that allows a user to register, or navigate to login
*/

import { observer } from "mobx-react-lite";
import { Link} from "react-router-dom";
import { Card, CardContent, CardFooter} from "@/components/ui/card"
import RegisterForm from "./RegisterForm";

function RegisterPage() {
    return (
        <div className="container">
            <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">

                {/* Page header */}
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-neutral-800 dark:text-neutral-50">Create an account</h1>
                </div>

                {/* Register Card */}
                <Card className="h-full w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 pt-3 shadow-none border-0 bg-background dark:bg-background">

                    <CardContent className="grid gap-4">
                        {/* Render the Register Form component */}
                        <RegisterForm></RegisterForm>
                    </CardContent>
                    
                    <CardFooter>
                        <div className="flex flex-col w-full items-center">
                            <div className="mx-auto flex w-full items-center font-light justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-neutral-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-neutral-400">
                                or
                            </div>
                            <p className="mt-4 text-base text-center">Already have an account?&nbsp;
                                <Link className="text-base font-bold hover:underline" to={"/accounts/login"}> Login&nbsp;</Link>
                            </p>
                        </div>

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(RegisterPage)