declare module 'ual-reactjs-renderer' {
    import { Context } from 'react';
    import { WaxUser } from '@eosdacio/ual-wax';

    export const UALContext: Context<{
        activeUser: WaxUser | null;
        showModal: Function;
        logout: Function;
        loading: boolean;
    }>;
    export const UALProvider: any;
}
