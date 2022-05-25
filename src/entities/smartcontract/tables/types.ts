export type UserInventoryType = {
    asset_id: string;
    asset_template_id: string;
    owner_user_id: string;
    activated: 0 | 1;
    is_visible: 0 | 1;
};

export type UserContractsType = {
    attrs: { key: string; value: string }[];
    client_asset_id: string;
    client_id: string;
    client_warranty_amount: number;
    executor_asset_id: string;
    executor_id: string;
    executor_warranty_amount: number;
    expired_at: number;
    fee: number;
    id: number;
    is_active: 0 | 1;
    min_amount: number;
    signed_by_client: 0 | 1;
    signed_by_executor: 0 | 1;
    type: number;
};

export type UserInfoType = {
    id: string;
    nickname: string;
    location: number;
    weight: number;
    stamina: number;
    experience: number;
    level: number;
    reputation: number;
};

export type UserHistoryType = {
    id: number;
    owner: string;
    contract_id: number;
    type: number;
    state: number;
    finishes_at: number;
    processes: {
        key: string;
        value: string;
    }[];
};