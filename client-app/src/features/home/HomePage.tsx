/**
 * Name: HomePage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the app's landing page. 
*/

import Footer from "@/app/layout/Footer"
import { useStore } from "@/app/stores/store";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax';
import { Search, Users, Heart } from 'lucide-react';

// Define component icons
export const Icons = {
    search: Search,
    follow: Users,
    like: Heart,
};

export default function HomePage() {
    // Access the mobx global stores
    const { userStore } = useStore();
    const { user } = userStore;

    useEffect(() => {
        // Negates behaviour of scrolling halfway down page upon load
        window.scrollTo(0, 0)
    });

    //Define the route for the 'Get Started' button based on user login status.
    let route;
    if (user == undefined) {
        route = `/accounts/login`;
    }
    else {
        route = `/${user?.userName}`;
    }

    return (
        <section className="overflow-hidden">

            {/* Hero image section */}
            <section id="hero" className="w-full h-[85vh] flex flex-col items-center justify-center">
                <div className="w-full container mx-auto flex flex-col items-center text-center">
                    {/* Header */}
                    <h1 className="w-full text-base xxxs:text-lg sm:text-xl lg:text-2xl xl:text-4xl font-medium text-neutral-800 dark:text-neutral-50">Join a community of music lovers at</h1>
                    {/* Dark hero text */}
                    <img className="w-full sm:w-1/2 hidden dark:block" src={"/assets/logo-darkmode.svg"} draggable="false" alt="logo" />
                    {/* Light hero text  */}
                    <img className="w-full sm:w-1/2 block dark:hidden" src="/assets/logo-lightmode.svg" draggable="false" alt="logo" />
                </div>
            </section>

            {/* Parallax image section */}
            <section id="demo-image" className="relative h-[50vh] w-full bg-neutral-100 dark:bg-neutral-950">
                <Parallax speed={10} translateY={[-20, 40]} className="h-full w-full">
                    <div className="absolute top-[-10%] sm:top-[-20%] lg:top-[-25%] w-full h-full flex justify-center">
                        <img
                            alt="Record Rack UI"
                            className="h-[30%] xxxs:h-[40%] xxs:h-[45%] xs:h-[50%] sm:h-[60%] md:h-3/4 lg:h-full"
                            src="https://res.cloudinary.com/dlwfuryyz/image/upload/v1696172995/Group_23_crzpne.png"
                        />
                    </div>
                </Parallax>
            </section>

            {/* Grid of features */}
            <section id="features-grid" className="h-auto w-full pb-24 bg-neutral-100 dark:bg-neutral-950">
                <div className="container">
                    <div className="pt-0 md:pt-40 w-auto flex flex-col items-center text-center">
                        {/* Header */}
                        <h1 className="max-w-3xl text-2xl lg:text-3xl xl:text-4xl font-medium text-neutral-800 dark:text-neutral-50">Share, explore, and connect with Record Rack – your all-digital music collection.</h1>
                    </div>

                    <div className="pt-24 w-full max-w-full space-y-4 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center text-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <div className="p-2 bg-black bg-opacity-50 rounded-full  text-neutral-800 dark:text-neutral-50">
                                    <Icons.search className="h-6 w-6 opacity-75" />
                                </div>
                                <h2 className="text-lg md:text-xl font-bold">Discover and Collect</h2>
                                <p className="max-w-lg text-base md:text-lg">
                                    Find your favorite albums and tracks and add them to your personal collection on Record Rack.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                                    <img className="bg-dark dark:bg-light h-6 w-6 opacity-75" src="/assets/spotify_icononly.svg" draggable="false"></img>
                                </div>
                                <h2 className="text-xl font-bold ">Powered by Spotify</h2>
                                <p className="max-w-lg">
                                    Discover a seamlessly integrated Spotify experience, allowing you to search and play Spotify music directly within the app.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                                    <Icons.follow className="h-6 w-6 opacity-75" />
                                </div>
                                <h2 className="text-xl font-bold ">Follow Users</h2>
                                <p className="max-w-lg">
                                    Connect with friends and fellow music enthusiasts. Follow their collections and stay updated on their latest discoveries.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                                    <Icons.like className="h-6 w-6 opacity-75" />
                                </div>
                                <h2 className="text-xl font-bold ">Like and Share</h2>
                                <p className="max-w-lg">
                                    Express your appreciation for great music by liking albums and tracks. Share your favorite finds with your followers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


           {/* call to action section */}
           <section id="cta" className="w-full h-[75vh] pt-24 flex flex-col items-center justify-center bg-neutral-200 dark:bg-[#050505]">
                <div className="w-full container mx-auto flex flex-col items-center text-center">
                    {/* Header */}
                    <h1 className="max-w-4xl text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-medium text-neutral-800 dark:text-neutral-50">Ready to elevate your music experience? Join Record Rack today! </h1>
    
                    {/* Btns */}
                    <div className="flex flex-row justify-center w-full sm:w-1/2 items-center mt-12 gap-4">
                        <Link className="w-1/2 xl:w-1/3" to={route}>
                            <Button className="w-full shadow-md" type="submit" size="lg">
                                <p className="text-xs xxs:text-sm lg:text-base ">Get Started</p>
                            </Button>
                        </Link>

                        <Link className="w-1/2 xl:w-1/3" to={`/about`}>
                            <Button className="w-full shadow-md" type="submit" size="lg" variant="secondary">
                                <p className="text-xs xxs:text-sm lg:text-base ">About</p>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="container pt-24 md:pt-48 ">
                    {/* Render the footer component */}
                    <Footer />
                </div>
            </section>

        </section>
    )

}
