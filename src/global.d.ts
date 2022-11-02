export type Nullable<T> = { [K in keyof T]: T[K] | null };

declare global {
    interface Window {
        ENDPOINTS: {
            wax: string[];
            atomic: string[];
            maintenance: {
                server: boolean;
            };
        };
    }
}
