import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';
import { useEvent } from 'effector-react';

import { logoutUserEffect } from 'entities/user';

export function useLogout() {
    const { logout } = useContext(UALContext);
    const logoutUser = useEvent(logoutUserEffect);

    return async () => {
        await logoutUser();
        logout();
        window.location.reload();
    };
}
