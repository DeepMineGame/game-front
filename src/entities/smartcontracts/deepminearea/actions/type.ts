export type Action<Data> = {
    authorization: { actor: string; permission: string }[];
    data: Data;
    name: string;
    account: string;
}[];
