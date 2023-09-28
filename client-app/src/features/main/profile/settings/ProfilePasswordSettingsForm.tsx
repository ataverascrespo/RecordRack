import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@/app/stores/store";
import { useToast } from "@/components/ui/use-toast";

/* 
  Form schema for PasswordChange validation
*/
const passwordChangeSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(7, { message: "Password must be atleast 7 characters" }),
})
/* 
    Define the inferred schema
*/
type PasswordChangeSchema = z.infer<typeof passwordChangeSchema>;

function ProfilePasswordSettingsForm() {
    const { userStore } = useStore();
    const { user } = userStore;
    const { toast } = useToast()

    /* 
        Define the form and form type
    */
    const form = useForm<PasswordChangeSchema>({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        },
    })

    /* 
        Define submission handler
    */
    const onSubmit = async (values: PasswordChangeSchema) => {

        // Create a new object that matches the UserChangePassword model
        // Pass in props token and form password
        const userChangeModel = {
            email: user!.email,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }

        try {
            const response: any = await userStore.changePassword(userChangeModel);
            //If the success field is true, display success toast
            if (response.success === true) {
                toast({
                    title: 'Sucessfully changed password.',
                    description: 'You have been logged out. Please log back in with your new password.'
                });
            }
            //If the success field is false, display error msg toast
            else {
                toast({
                    variant: "destructive",
                    title: "Oh no! Something went wrong.",
                    description: response.response.data.returnMessage
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
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Current password</Label>
                                    <Input id="old-password" type="password" autoComplete="on" placeholder="Enter your current password" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">New password</Label>
                                    <Input id="new-password" type="password" autoComplete="off" placeholder="Enter your new password" {...field} />
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

export default ProfilePasswordSettingsForm