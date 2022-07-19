import { useEffect, useReducer } from 'react';

/**
 * can be used for rerender component on timeout
 * for example timer or countdown

 * @param isActive - activated or not
 * @param timeoutMs - timeout in milliseconds
 */

export const useTick = (isActive = true, timeoutMs = 1000) => {
    const [, update] = useReducer((state) => !state, true);

    useEffect(() => {
        let timerId: number;

        if (isActive) {
            timerId = window.setInterval(update, timeoutMs);
        }

        return () => window.clearInterval(timerId);
    }, [isActive, timeoutMs, update]);
};
