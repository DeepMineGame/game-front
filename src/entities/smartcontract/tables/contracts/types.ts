export enum ContractType {
    undefined,
    landlord_mineowner,
    mineowner_contractor,
}
enum ContractStatus {
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
    executor_asset_id: string;
    type: ContractType;
    finishes_at: number;
    fee: number;
    min_amount: number;
    client_warranty_amount: number;
    executor_warranty_amount: number;
    attrs: [
        {
            key: string;
            value: string;
        }
    ];
    is_active: number;
    signed_by_client: number;
    signed_by_executor: number;
    penalty_amount: number;
    status: ContractStatus;
};

export const contractName = {
    [ContractType.undefined]: null,
    [ContractType.landlord_mineowner]: 'Mine setup',
    [ContractType.mineowner_contractor]: 'Mining contract',
};
