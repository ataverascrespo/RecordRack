import { observer } from "mobx-react-lite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PasswordEmailForm from "./PasswordEmailForm";

function PasswordForgotPage() {
    return (
        <div className="container">
            <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">

                {/* header */}
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-50">Reset your password</h1>
                </div>
                <Card className="h-full w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 pb-6">

                    <CardHeader className="space-y-1">
                        <CardTitle>
                            <p className="text-base md:text-lg">Enter your email below.</p>
                        </CardTitle>
                        <CardDescription>A link will be sent to your email with instructions.</CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <PasswordEmailForm></PasswordEmailForm>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

export default observer(PasswordForgotPage)