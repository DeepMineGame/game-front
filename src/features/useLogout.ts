import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';
import { clearUserStoreEvent } from 'entities/user';

export function useLogout() {
    const { logout } = useContext(UALContext);

    return () => {
        clearUserStoreEvent();
        logout();
    };
}
