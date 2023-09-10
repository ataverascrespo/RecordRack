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
                        <Button variant="ghost"><p className="text-sm">about</p></Button>
                    </NavLink>

                    <Button variant="ghost"><a href="" className="text-sm">contact</a></Button>

                    <Button variant="ghost"><a href="https://github.com/ataverascrespo/RecordRack" className="text-sm">github repo</a></Button>

                    <Button variant="ghost"><a href="" className="text-sm">donate</a></Button>

                </ul>
            </div>
        </footer>
    )
}

