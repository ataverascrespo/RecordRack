/**
 * Name: LoginPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the page that allows a user to log in, navigate to register, or reset their password
*/

import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import LoginForm from "./LoginForm";

function LoginPage() {
    return (
        <div className="container">
            <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">

                {/* Page header */}
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="w-full text-2xl sm:text-4xl md:text-5xl font-bold text-center text-neutral-800 dark:text-neutral-50">Sign In</h1>
                </div>

                {/* Login card */}
                <Card className="h-full w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 pt-6 shadow-none border-0 bg-background dark:bg-background">

                    <CardContent className="grid gap-4">
                        {/* Render the Login Form component */}
                        <LoginForm></LoginForm>
                        <div className="flex">
                            <Link className="text-center font-semibold text-sm hover:underline" to={"/accounts/forgot-password"}>
                                Forgot your password?
                            </Link>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <div className="flex flex-col w-full items-center">
                            <div className="mx-auto flex w-full items-center font-light justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-neutral-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-neutral-400">
                                or
                            </div>
                            <p className="mt-4 text-base text-center">Don't have an account?&nbsp;
                                <Link className="text-base font-bold hover:underline" to={"/accounts/register"}> Register&nbsp;</Link>
                            </p>
                        </div>

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(LoginPage)