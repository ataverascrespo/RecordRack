import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@/app/stores/store";

/* 
  Form schema for account register validation
*/
const accountFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(32, {
        message: "Username must not be longer than 32 characters.",
    }),
    password: z.string().min(7, { message: "Password must be atleast 7 characters" }),
})

/* 
    Define the inferred schema
*/
type AccountSchema = z.infer<typeof accountFormSchema>;

function RegisterForm() {

    //Initialize user store
    const { userStore } = useStore();
    //Initialize toast component
    const { toast } = useToast()

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
    const onSubmit = async (values: AccountSchema) => {
        try {
            const response: any = await userStore.register(values);
            //If the success field is true, set valid
            if (response.success === true) {
                toast({
                    title: "Account successfully created!",
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
                                    <Input id="username" type="username" placeholder="i.e John Doe or johndoe123"{...field} />
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