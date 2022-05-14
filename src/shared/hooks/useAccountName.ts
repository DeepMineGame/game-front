import { useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';

export function useAccountName() {
    const chainAccount = useContext(UALContext);
    return chainAccount.activeUser?.accountName ?? '';
}
