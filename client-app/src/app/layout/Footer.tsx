/**
 * Name: Footer.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file handles the rendering of the footer
*/

import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-background my-12">
            <div className="w-full md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://www.linkedin.com/in/alex-taveras-crespo" className="hover:underline">alex taveras-crespo</a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <NavLink to={"/about"}>
                        <Button className="px-2 sm:px-4" variant="ghost"><p className="text-xs xxs:text-sm">about</p></Button>
                    </NavLink>
                    <Button className="px-2 sm:px-4" variant="ghost">
                        <a href="mailto:alexmanuelt@hotmail.com?subject=Record%20Rack%20Feedback%20" className="text-xs xxs:text-sm">contact</a>
                    </Button>
                    <Button className="px-2 sm:px-4" variant="ghost">
                        <a href="https://github.com/ataverascrespo/RecordRack" className="text-xs xxs:text-sm">github repo</a>
                    </Button>
                    <Button className="px-2 sm:px-4" variant="ghost">
                        <a href="https://www.buymeacoffee.com/ataverascrespo" className="text-xs xxs:text-sm">donate</a>
                    </Button>
                </ul>
            </div>
        </footer>
    )
}

