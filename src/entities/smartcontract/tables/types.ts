export type UserInfoType = {
    owner: string;
    location: number;
    weight: number;
    stamina: number;
    experience: number;
    level: number;
    register_datetime: number;
};

export type UserHistoryType = {
    id: number;
    owner: string;
    contract_id: number;
    type: number;
    state: number;
    finishes_at: number;
    attrs: {
        key: string;
        value: string;
    }[];
};
