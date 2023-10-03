import Footer from "@/app/layout/Footer"
import { useStore } from "@/app/stores/store";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import darkLogo from "./assets/logo-darkmode.svg";
import lightLogo from "./assets/logo-lightmode.svg";


export default function HomePage() {
    //Get the mobx global stores
    const { userStore } = useStore();
    const { user } = userStore;

    useEffect(() => {
        //Negates behaviour of scrolling halfway down page upon load
        window.scrollTo(0, 0)
    });

    let route;
    if (user == undefined) {
        route = `/accounts/login`;
    }
    else {
        route = `/${user?.userName}`;
    }

    return (
        <><section id="hero" className="h-screen flex flex-col justify-center lg:justify-between lg:flex-row items-center gap-24">
            <div className="h-full container z-10 mt-48 lg:mt-0 flex flex-col justify-start lg:flex-row lg:justify-between items-center ">
                <div className="flex flex-col items-start lg:justify-center text-left ">
                    <div className="w-full h-full mb-16">
                        {/* Header */}
                        <h1 className="max-w-xl text-base xxs:text-lg sm:text-xl lg:text-2xl xl:text-4xl font-semibold text-neutral-800 dark:text-neutral-50">Unlock the world of music with</h1>
                        {/* Dark hero text */}
                        <img className="w-full hidden dark:block" src={darkLogo} draggable="false" alt="" />
                        {/* Light hero text  */}
                        <img className="w-full block dark:hidden" src={lightLogo} draggable="false" alt="" />
                        {/* Subheader */}
                        <h2 className="max-w-xl mt-4 sm:mt-6 text-xs xs:text-base lg:text-lg xl:text-2xl font-light text-neutral-600 text-left dark:text-neutral-300">The all-digital music network, always a click away</h2>
                        {/* Btns */}
                        <div className="flex flex-row justify-start w-full items-center mt-12 gap-4">
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

                    {/* Mobile image */}
                    <div className="flex lg:hidden w-full h-full z-10 overflow-hidden justify-center">
                        {/* Lazy load the hero image */}
                        <LazyLoadImage
                            className="h-full w-full"
                            src="https://res.cloudinary.com/dlwfuryyz/image/upload/v1696172995/Group_23_crzpne.png"
                            alt="hero"
                            effect="blur"
                            draggable="false" />
                    </div>
                </div>
            </div>

            {/* Desktop / large tablets image */}
            <div className="hidden lg:flex w-full h-full -z-10 absolute overflow-hidden flex-row items-center">
                {/* Lazy load the hero image */}
                <LazyLoadImage
                    className="relative w-full  lg:w-[80%] xl:w-[70%] lg:left-[700px] 2xl:left-[1050px] 3xl:left-[1300px] px-8 sm:px-24 md:px-40 lg:px-0"
                    src="https://res.cloudinary.com/dlwfuryyz/image/upload/v1696172995/Group_23_crzpne.png"
                    alt="hero"
                    effect="blur"
                    draggable="false" />
            </div>

        </section>
            <div className="container mt-24 ">
                <Footer />
            </div></>
    )

}
