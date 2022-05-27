export type GetTableDataConfigType = {
    code: string;
    scope: string;
    table: string;
    index_position: number;
    key_type: 'id' | 'i64' | 'name' | '';
    lower_bound: string | number;
    upper_bound?: string | number;
    limit: number;
};

export type GetTableDataResponseType<T> = {
    rows: T[];
    more: boolean;
    next_key: string;
};
