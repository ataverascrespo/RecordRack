/**
 * Name: HTTPNotFoundPage.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file renders the page that displays on a 404 Not Found error 
*/

import { observer } from "mobx-react-lite";

function HTTPNotFoundPage() {
    return (
        <div className="container">
            <div className="h-full mt-48 mb-12 flex flex-col justify-center gap-8 items-center ">
             <img className="w-full md:w-[75%] lg:w-[40%] mt-12 lg:mt-0" src="/assets/404.svg" alt="hero" draggable="false" />
                <div className="flex flex-col items-center text-center lg:justify-center gap-4">
                    <h1 className="w-full text-2xl md:text-3xl xl:text-5xl font-semibold text-neutral-800 dark:text-neutral-50">Oops! This record must have skipped a beat.</h1>
                    <h2 className="max-w-3xl text-base md:text-xl font-normal text-neutral-800 dark:text-neutral-50">The requested URL could not be found. </h2>
                </div>
            </div>
        </div>
    )
}

// Wrap component in observer to respond to MobX state changes
export default observer(HTTPNotFoundPage)