import Footer from "@/app/layout/Footer"
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function HomePage() {
    return (
        <section id="hero" className="container">
            <div className="h-screen lg:h-[100vh] z-10 mt-48 lg:mt-0 flex flex-col justify-start lg:flex-row lg:justify-between items-center">
                <div className="flex flex-col items-start lg:justify-center text-left">
                    <h1 className="max-w-xl text-xl lg:text-2xl xl:text-4xl font-semibold text-neutral-800 dark:text-neutral-50">Unlock the world of music with</h1>
                    <img className="w-full hidden dark:block" src="./src/assets/logo-darkmode.svg" draggable="false" alt="" />
                    <img className="w-full block dark:hidden" src="./src/assets/logo-lightmode.svg" draggable="false" alt="" />
                    <h2 className="max-w-xl mt-6 text-base lg:text-lg xl:text-2xl font-light text-neutral-600 text-left dark:text-neutral-300">The all-digital music network, always a click away</h2>
                    <div className="flex flex-row justify-start w-full items-center mt-12 gap-4">
                        <Button className="w-1/2 xl:w-1/3 shadow-md" type="submit" size="lg"><p className="text-sm lg:text-base ">Get Started</p></Button>
                        <Button className="w-1/2 xl:w-1/3 shadow-md" size="lg" variant="secondary"><p className="text-sm lg:text-base">About</p></Button>
                    </div>
                </div>

                <div className="h-full -z-10 absolute overflow-hidden">
                    {/* Lazy load the hero image */}
                    <LazyLoadImage
                        className="w-full relative lg:w-[80%] top-[40%] px-8 sm:px-24 md:px-40 lg:px-0 lg:top-40 xl:top-28 lg:left-1/2 "
                        src="https://res.cloudinary.com/dlwfuryyz/image/upload/v1696000234/Group_23_crzpne.png"
                        alt="hero"
                        effect="blur"
                        draggable="false" />
                </div>

            </div>
            <div className="-mt-40 md:-mt-0">
                <Footer/>
            </div>

        </section>
    )

}
