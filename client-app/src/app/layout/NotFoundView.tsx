/* 
    This page displays when a data fetch cannot find the requested data
*/ 

import { observer } from "mobx-react-lite";
import { XCircle } from 'lucide-react';
import { ThemeProvider } from "@/components/theme-provider";

export const Icons = {
    error: XCircle
};

// Define the component props
interface Props {
    text: string;
    height: string;
}

function NotFoundView({ text, height }: Props) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="container">
                <div className={`${height} flex flex-col justify-center items-center gap-4 text-neutral-800`}>
                    <Icons.error className="w-[10vw] h-[10vh]" />
                    <h2 className="text-base md:text-xl text-center font-bold">{text}</h2>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default observer(NotFoundView)