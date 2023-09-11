import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";


/* 
  Form schema for PasswordReset validation
*/
const passwordResetFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required to reset password" }).email({
        message: "Must be a valid email",
    }),
})

/* 
    Define the inferred schema
*/
type PasswordResetSchema = z.infer<typeof passwordResetFormSchema>;

function PasswordEmailForm() {

    const [isSubmitted, setSubmitted] = useState(false);

    /* 
        Define the form and form type
    */
    const form = useForm<PasswordResetSchema>({
        resolver: zodResolver(passwordResetFormSchema),
        defaultValues: {
            email: "",
        },
    })

    /* 
        Define submission handler
    */
    const onSubmit = (values: PasswordResetSchema) => {
        setSubmitted(true);

        //axios agent the api call for resetting token
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
                                        <Input id="email" type="email" placeholder="m@example.com" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <Button className="w-full" type="submit">Reset password</Button>
                </form>
            </Form>
        )
    }
    else {
        return (
            <p className="text-base md:text-lg font-bold">We have sent you an email with reset instructions.</p>
        )
    }
}

export default PasswordEmailForm