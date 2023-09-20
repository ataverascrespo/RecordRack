import { observer } from "mobx-react-lite";
import { XCircle } from 'lucide-react';
import { ThemeProvider } from "@/components/theme-provider";

export const Icons = {
    error: XCircle
};

// Define the component props
interface Props {
    text: string;
}

function NotFoundView({ text }: Props) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="container">
                <div className="h-screen flex flex-col justify-center items-center gap-4">
                    <Icons.error className="w-[10vw] h-[10vh]" />
                    <h2 className="text-xl font-bold">{text}</h2>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default observer(NotFoundView)