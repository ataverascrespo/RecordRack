/**
 * Name: PasswordResetForm.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the form used for resetting user password
*/

import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@/app/stores/store";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

/* 
  Define the props received from parent component
  In this case, the page's URL reset token
*/
interface Props { 
    resetToken: string;
}

/* 
  Form schema for PasswordReset validation
*/
const passwordResetSchema = z.object({
    password: z.string().min(7, { message: "Password must be atleast 7 characters" }),
})

/* 
    Define the inferred schema
*/
type PasswordResetSchema = z.infer<typeof passwordResetSchema>;

function PasswordResetForm({ resetToken }: Props) {

    //Initialize user store
    const { userStore } = useStore();
    //Initialize toast component
    const { toast } = useToast();
    //Store state for button disabling
    const [buttonDisabled, setButtonDisabled] = useState(false);

    /* 
        Define the form and form type
    */
    const form = useForm<PasswordResetSchema>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            password: "",
        },
    })

    /* 
        Define submission handler
    */
    const onSubmit = async (values: PasswordResetSchema) => {
        //Disable form button so that the form cannot submit multiple times
        setButtonDisabled(true);

        // Create a new object that matches the UserResetPassword model
        // Pass in props token and form password
        const userResetModel = {
            resetToken: resetToken,
            password: values.password,
        }

        try {
            const response: any = await userStore.resetPassword(userResetModel);
            //If the success field is true, display success toast
            if (response.success === true) {
                toast({
                    title: 'Sucessfully changed password.',
                });
            }
            //If the success field is false, display error msg toast
            else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: response.response.data.returnMessage + " Ensure that the password reset email has not expired."
                });
            }
        } catch (error) {
            //If there is no response at all, display general error
            toast({
                variant: "destructive",
                title: "Oh no! Something went wrong.",
                description: "Please try again later.",
            });
            throw (error)
        }
        setButtonDisabled(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input className="shadow-inner" id="password" type="password" placeholder="Enter your password" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <Button className="w-full shadow-md" type="submit" disabled={buttonDisabled}>Reset password</Button>
            </form>
        </Form>
    )
}

export default PasswordResetForm