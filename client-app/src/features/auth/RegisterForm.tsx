import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

/* 
  Form schema for account register validation
*/
const accountFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(30, {
        message: "Username must not be longer than 30 characters.",
    }),
    password: z.string().min(7, { message: "Password must be atleast 7 characters" }),
})

/* 
    Define the inferred schema
*/
type AccountSchema = z.infer<typeof accountFormSchema>;

function RegisterForm() {
    /* 
        Define the form and form type
    */
    const form = useForm<AccountSchema>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    })

    /* 
        Define submission handler
    */
    const onSubmit = (values: AccountSchema) => {
        console.log(values);
    }

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
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Username</Label>
                                    <Input id="user" type="username" {...field} />
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
                                    <Input id="password" type="password"  {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <Button className="w-full" type="submit">Create account</Button>
            </form>
        </Form>

    )
}

export default RegisterForm