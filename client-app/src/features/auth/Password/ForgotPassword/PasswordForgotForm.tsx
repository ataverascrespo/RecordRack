import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useStore } from "@/app/stores/store";
import { useToast } from "@/components/ui/use-toast";


/* 
  Form schema for PasswordForgot validation
*/
const passwordForgotSchema = z.object({
    email: z.string().min(1, { message: "Email is required to reset password" }).email({
        message: "Must be a valid email",
    }),
})

/* 
    Define the inferred schema
*/
type PasswordForgotSchema = z.infer<typeof passwordForgotSchema>;

function PasswordForgotForm() {

    const { userStore } = useStore();
    const { toast } = useToast()
    
    const [isSubmitted, setSubmitted] = useState(false);

    /* 
        Define the form and form type
    */
    const form = useForm<PasswordForgotSchema>({
        resolver: zodResolver(passwordForgotSchema),
        defaultValues: {
            email: "",
        },
    })

    /* 
        Define submission handler
    */
    const onSubmit = async (values: PasswordForgotSchema) => {
        try {
            const response: any = await userStore.forgotPassword(values)
            //If the success field is true, display success toast
            if (response.success === true) {
                toast({
                    title: 'Sucessfully sent password reset email. ',
                })
                setSubmitted(true);
            }
            //If the success field is false, display error msg toast
            else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: response.response.data.returnMessage + " Please enter a valid email.",
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
    }

    if (!isSubmitted) {
        return (
            <Form {...form}>
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
                    <Button className="w-full shadow-md" type="submit">Confirm email</Button>
                </form>
            </Form>
        )
    }
    else {
        return (
            <div className="w-full">
                <p className="text-base md:text-lg font-bold mb-2">We have sent you an email with reset instructions.</p>
                <p className="text-sm font-light "> Make sure to check your junk/spam if you don't see it.</p>
           </div>
        )
    }
}

export default PasswordForgotForm