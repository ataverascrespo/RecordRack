/*
    Header that takes advantage of some pretty cool CSS tricks to "clamp" the font size to the div size
    So shorter album names appear bigger, longer names appear smaller
    Inspired by Spotify UI
*/

import { useEffect, useRef, useState } from 'react';

interface Props {
    albumName?: string;
}

function RackViewHeader({ albumName }: Props) {
    // Create a ref to access the parent container element
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [fontSize, setFontSize] = useState<number | null>(null);
    const [hasMargin, setHasMargin] = useState<boolean>(false);

    useEffect(() => {
        const adjustFontSize = () => {
            // Get a reference to the parent container element
            const headerElement = headerRef.current;

            // return if either the container element or albumName are not available
            if (!headerElement || !albumName) return;

            // Calculate a base font size based on the container width and album name length
            let baseFontSize = headerElement.clientWidth / (albumName.length * 0.6);
            // Define minimum and maximum font sizes 
            const minFontSize = 12;
            const maxFontSize = 64;
            // Ensure the calculated font size is within the specified range
            baseFontSize = Math.min(maxFontSize, Math.max(minFontSize, baseFontSize));

            // Check if font size exceeds the threshold for adding margin
            if (baseFontSize < 45) {
                setHasMargin(true);
            } else {
                setHasMargin(false);
            }

            setFontSize(baseFontSize);
        };
        adjustFontSize();
        // Add a resize event listener to recalculate font size when the window is resized
        window.addEventListener('resize', adjustFontSize);

        return () => {
            window.removeEventListener('resize', adjustFontSize);
        };
    }, [albumName]);

    return (
        <div ref={headerRef} className={`w-full ${hasMargin ? 'ml-1' : ''}`}>
            <h1
                className="font-bold text-neutral-900 dark:text-neutral-50"
                style={{ fontSize: fontSize ? `${fontSize}px` : 'inherit' }}
            >
                {albumName}
            </h1>
        </div>
    );
}

export default RackViewHeader;