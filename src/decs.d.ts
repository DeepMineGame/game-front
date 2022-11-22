declare module 'ual-reactjs-renderer' {
    import { Context } from 'react';
    import { WaxUser } from '@eosdacio/ual-wax';

    export const UALContext: Context<{
        activeUser: WaxUser | null;
        showModal: () => void;
        logout: Function;
        loading: boolean;
    }>;
    export const UALProvider: any;
}

declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module '*.webm' {
    const src: string;
    export default src;
}
