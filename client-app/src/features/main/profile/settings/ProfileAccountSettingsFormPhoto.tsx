/**
 * Name: ProfileAccountSettingsFormPhoto.tsx
 * Written by: Alex Taveras-Crespo. A large majority of this component was templated from react-images-uploading
                                    https://www.npmjs.com/package/react-images-uploading
                                    Shoutout to David Nyugen and Tony Tran!
 * 
 * Purpose: This code file contains the form that allows users to upload profile pictures
*/


import { useState } from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { UploadIcon } from 'lucide-react';
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { useStore } from '@/app/stores/store';


// Define component icons
export const Icons = {
    upload: UploadIcon
};

/* 
  Form schema for ImageUpload validation
*/
const imageUploadSchema = z.object({
    image: z.any()
})

/* 
    Define the inferred schema
*/
type ImageUploadSchema = z.infer<typeof imageUploadSchema>;


function ProfileAccountSettingsFormPhoto() {
    const { profileStore } = useStore();

    //Create a state of an empty array of images, of type ImageType
    const [images, setImages] = useState<ImageType[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    /* 
        Define the form and form type
    */
    const form = useForm<ImageUploadSchema>({
        resolver: zodResolver(imageUploadSchema),
        defaultValues: {
            image: "",
        },
    })

    /*
        Define function for when image gets uploaded from widget
    */
    const onChange = (
        imageList: ImageListType,
    ) => {
        // data for submit
        setImages(imageList as ImageType[]);
    };

    /*
        Define function for image is submitted to back-end
    */
    // Don't need to pass any values because this onSubmit function can only be triggered once images length > 0
    const onSubmit = async () => {

        //Disable form button so that the form cannot submit multiple times
        setButtonDisabled(true);
        try {
            await profileStore.uploadProfilePhoto(images[0].file!);
        } catch (error) {
            throw (error)
        }
        setButtonDisabled(false);
    }

    let uploadButton;
    //If no images, show no button
    if (images.length === 0) {
        uploadButton = <div></div>
    }
    //If an image, re-render submit button
    else {
        uploadButton = <Button type="submit" className="mt-8 w-full" disabled={buttonDisabled}>Upload Photo</Button>
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                        <FormItem>
                            <FormControl>
                            <div className='w-full'>
                                <ImageUploading
                                    value={images}
                                    onChange={onChange}
                                    // Set max file size to 5mb and img types to jpg and png
                                    maxFileSize={5000000}
                                    acceptType={['jpg', 'png']}
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        isDragging,
                                        dragProps
                                    }) => (
                                        <div className="upload__image-wrapper flex flex-col lg:flex-row justify-start items-center gap-4 lg:gap-8 ">
                                            <button
                                                style={isDragging ? { color: "red" } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                    className='w-full lg:w-1/2 h-[150px] lg:h-[200px] rounded-xl border-2 border-neutral-500 hover:border-neutral-800 dark:hover:border-neutral-300 transition-all transform duration-200'
                                                    type="button"
                                            >
                                                <div className='flex flex-col items-center justify-center gap-0 lg:gap-4'>
                                                    <Icons.upload className="w-[10vw] h-[10vh]" />
                                                    <p className='px-4'>Click here, or drag and drop.</p>
                                                </div>
                                            </button>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <div className="flex flex-row lg:flex-col items-center gap-8 lg:gap-4">
                                                        <img src={image.dataURL} alt="" className='object-fill w-[100px] h-[100px] md:w-[150px] md:h-[150px] xl:w-[200px] xl:h-[200px] rounded-full' />
                                                        <p>Upload Preview</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                {/* Component only appears if there is a selected image */}
                {uploadButton}
            </form>
        </Form>
    );
}

export default ProfileAccountSettingsFormPhoto