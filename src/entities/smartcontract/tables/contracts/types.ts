export enum ContractType {
    undefined,
    landlord_mineowner,
    mineowner_contractor,
}

export enum ContractStatus {
    undefined,
    signed_by_client,
    signed_by_executor,
    active,
    terminated,
}

export const statusMap = {
    [ContractStatus.undefined]: null,
    [ContractStatus.signed_by_client]: 'Signed by client',
    [ContractStatus.signed_by_executor]: 'Signed by executor',
    [ContractStatus.active]: 'Active',
    [ContractStatus.terminated]: 'Terminated',
};

export type ContractDto = {
    id: number;
    client: string;
    client_asset_id: string;
    executor: string;
    executor_asset_id: number;
    type: ContractType;
    fee_percent: number;
    fee_daily_min_amount: number;
    days_for_penalty: number;
    penalty_amount: number;
    demand_penalty: number;
    penalty_available: number;
    create_time: number;
    activation_time: number;
    start_time: number;
    deadline_time: number;
    term_time: number;
    term_initiator: string;
    finishes_at: number;
    is_active: number;
    status: ContractStatus;
    fee_days: any[];
    min_amount: number;
    client_warranty_amount: number;
    executor_warranty_amount: number;
    attrs: [
        {
            key: string;
            value: string;
        }
    ];
    signed_by_client: number;
    signed_by_executor: number;
};

export const contractName = {
    [ContractType.undefined]: null,
    [ContractType.landlord_mineowner]: 'Mine setup',
    [ContractType.mineowner_contractor]: 'Mining contract',
};
