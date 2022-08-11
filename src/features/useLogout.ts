import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';
import { useEvent } from 'effector-react';
import { useNavigate } from 'react-router';
import { root } from 'app/router/paths';
import { logoutUserEffect } from 'entities/user';

export const useLogout = () => {
    const { logout } = useContext(UALContext);
    const logoutUser = useEvent(logoutUserEffect);
    const navigate = useNavigate();

    return async () => {
        await logoutUser();
        logout();
        navigate(root);
    };
};
