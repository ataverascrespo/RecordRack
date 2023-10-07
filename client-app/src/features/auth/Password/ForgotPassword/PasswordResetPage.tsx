/**
 * Name: PasswordResetPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the page for a user resetting their password
*/

import { observer } from "mobx-react-lite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserResetPassword} from "@/app/models/user";
import PasswordResetForm from "./PasswordResetForm";

function PasswordResetPage() {
    const navigate = useNavigate();

    //Create a UserResetPassword object
    const [passwordReset] = useState<UserResetPassword>({ resetToken: "", password: ""});

    //Get the token from the provided URL search parameters 
    //i.e /reset-password?=E998C4461E2C3D26FA6BF63077C53C200613B87A5
    const [searchParams] = useSearchParams();
    const token = searchParams.get("");

    useEffect(() => {
        if (token !== null) {
            //Set the reset token 
            passwordReset.resetToken = token!;
        }
        else {
            navigate('/accounts/forgot-password')
        }
    }, [token]);

    
    return (
        <div className="container">
            <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">

                {/* Page header */}
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-50">Reset your password</h1>
                </div>

                {/* Reset password card */}
                <Card className="h-full w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 pb-6">

                    <CardHeader className="space-y-1">
                        <CardTitle>
                            <p className="text-base md:text-lg">Enter your new password below.</p>
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        {/* Redner the Password reset form */}
                       <PasswordResetForm resetToken={token!}></PasswordResetForm>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(PasswordResetPage)