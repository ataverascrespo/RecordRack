import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

/* 
  Form schema for login validation
*/
const loginFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required for login" }).email({
        message: "Must be a valid email",
    }),
    password: z.string().min(1, { message: "Password is required for login" }),
})

/* 
    Define the inferred schema
*/
type LoginSchema = z.infer<typeof loginFormSchema>;

function LoginForm() {

    //Initialize user store
    const { userStore } = useStore();
    //Initialize toast component
    const { toast } = useToast();
    //Store state for button disabling
    const [buttonDisabled, setButtonDisabled] = useState(false);

    /* 
        Define the form and form type
    */
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    /* 
        Define submission handler
    */
    const onSubmit = async (values: LoginSchema) => {
        //Disable form button so that the form cannot submit multiple times
        setButtonDisabled(true);
        try {
            const response: any = await userStore.login(values)
            //If the success field is true, display success toast
            if (response.success === true) {
                toast({
                    title: `Logged in ${response.data.userName}!`,
                })
            }
            //If the success field is false, display error msg toast
            else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: response.response.data.returnMessage,
                })
            }
        } catch (error) {
            //If there is no response at all, display general error
            toast({
                variant: "destructive",
                title: "Oh no! Something went wrong.",
                description: "Please try again later.",
            })
            throw (error)
        }
        setButtonDisabled(false);
    }

    return (
        <Form {...form}>
            {/* Call form submission handler */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input className="shadow-inner" id="email" type="email" placeholder="m@example.com" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input className="shadow-inner" id="password" autoComplete="on" type="password"  {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <Button className="w-full shadow-md" type="submit" disabled={buttonDisabled}>Sign in</Button>
            </form>
        </Form>
    )
}

export default observer(LoginForm)