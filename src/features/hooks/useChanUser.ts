import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';

export function useChainAuthContext() {
    const context = useContext(UALContext);
    return context;
}
