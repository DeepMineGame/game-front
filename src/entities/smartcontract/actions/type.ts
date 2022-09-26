export type Action<Data> = {
    authorization: { actor: string; permission: string }[];
    data: Data;
    name: string;
    account: string;
}[];

export type PhysicalShiftParams = {
    wax_user: string;
    new_location: number;
};
