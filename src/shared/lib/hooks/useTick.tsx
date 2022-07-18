import { useEffect, useReducer } from 'react';

export const useTick = (active = true, timeoutMs = 1000) => {
    const [, update] = useReducer((state) => !state, true);

    useEffect(() => {
        let timerId: number;

        if (active) {
            timerId = window.setInterval(update, timeoutMs);
        }

        return () => window.clearInterval(timerId);
    }, [active, timeoutMs, update]);
};
