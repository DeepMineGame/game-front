import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';

const getLoggedInAuthType = () => localStorage.getItem('UALLoggedInAuthType');

const getLoggedInAuthExpiredAt = () =>
    new Date(localStorage.getItem('UALInvalidateAt') ?? '');

export function useChainAuthContext() {
    return {
        ...useContext(UALContext),
        notLoggedIn:
            !getLoggedInAuthType() || new Date() > getLoggedInAuthExpiredAt(),
    };
}
