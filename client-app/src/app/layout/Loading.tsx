import { observer } from "mobx-react-lite";
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from "@/components/theme-provider";

export const Icons = {
    spinner: Loader2,
};

function Loading() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="container">
                <div className="h-screen flex flex-col justify-center items-center gap-4">
                    <Icons.spinner className="w-[10vw] h-[10vh] animate-spin" />
                    <h2 className="text-xl font-bold">App Loading...</h2>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default observer(Loading)