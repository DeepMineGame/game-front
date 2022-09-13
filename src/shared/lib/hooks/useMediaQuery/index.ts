import { useEffect, useState } from 'react';

export const tablet = '(min-width: 769px)'; // sync with $media-tablet
export const desktopS = '(min-width: 1024px)';

// adopted from https://usehooks-ts.com/react-hook/use-media-query
export function useMediaQuery(query: string): boolean {
    const getMatches = (queryString: string): boolean =>
        window.matchMedia(queryString).matches;

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    function handleChange() {
        setMatches(getMatches(query));
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query);
        // Triggered at the first client-side load and if query changes
        handleChange();
        matchMedia.addEventListener('change', handleChange);
        return () => matchMedia.removeEventListener('change', handleChange);
    });

    return matches;
}
