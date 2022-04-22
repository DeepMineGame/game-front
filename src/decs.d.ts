declare module 'ual-reactjs-renderer' {
    import { Context } from 'react';
    import { WaxUser } from '@eosdacio/ual-wax';

    export const UALContext: Context<{
        activeUser?: WaxUser;
        showModal: Function;
        logout: Function;
    }>;
    export const UALProvider: any;
}
