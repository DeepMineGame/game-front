import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';

export function useChainAuthContext() {
    return useContext(UALContext);
}
