import { observer } from "mobx-react-lite";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";

function RegisterPage() {
    return (
        <div className="container">
            <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">

                {/* header */}
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-50">Create an account</h1>
                    <div className="flex flex-row gap-2 items-center">
                        <h2 className="text-base md:text-lg font-light">Already have an account?</h2>
                        <NavLink to={"/login"}>
                            <p className="text-base md:text-lg font-bold hover:underline">Login</p>
                        </NavLink>
                    </div>
                </div>

                <Card className="h-full w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2">
                    <CardHeader className="space-y-1">
                        <CardTitle>
                            <p className="text-base md:text-lg">Enter your details below to register</p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Username</Label>
                            <Input id="user" type="username" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Create account</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default observer(RegisterPage)