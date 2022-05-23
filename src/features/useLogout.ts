import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';

import { clearUserStoreEvent } from 'entities/user';

export function useLogout(onLogout?: () => void) {
    const { logout } = useContext(UALContext);

    return () => {
        clearUserStoreEvent();
        logout();
        if (onLogout) {
            onLogout();
        }
    };
}
