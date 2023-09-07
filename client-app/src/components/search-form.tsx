"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
 
const FormSchema = z.object({
    album: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
export function SearchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        album: "",
      },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
 
    return (
    <div className="w-2/3 flex items-center justify-center">
        <Tabs className="w-full space-y-6" defaultValue="album">
            <TabsList>
            <TabsTrigger className="w-[150px]" value="album">Albums</TabsTrigger>
            <TabsTrigger className="w-[150px]" value="track">Tracks</TabsTrigger>
            </TabsList>
            <TabsContent value="album" className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                        control={form.control}
                        name="album"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                              <div className="flex flex-row gap-4 items-center">
                                  <Input placeholder="Enter the name of an artist or an album..." {...field} />
                                  <Button type="submit" size="lg"><p className="text-base">Search</p></Button>
                                  
                              </div>
                            </FormControl>
                            </FormItem>
                        )}
                            />
                                
                    </form>
            </Form>
            
            </TabsContent>
            <TabsContent value="track">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                        control={form.control}
                        name="album"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder="Enter the name of an artist or an individual track..." {...field} />
                            </FormControl>
                            </FormItem>
                        )}
                            />
                            <div className="flex flex-row gap-12 items-center">
                                <Button type="submit" size="lg"><p className="text-base">Search</p></Button>
                                <div className="flex flex-row gap-2 items-center">
                                    <h2 className="font-semibold text-base text-neutral-400 dark:text-neutral-600">Powered by</h2>
                                    <img className="bg-light dark:bg-dark" src="./src/assets/spotify.svg"></img>
                                </div>
                            </div>
                    </form>
                </Form>
            </TabsContent>
        </Tabs>
    </div>
  )
}