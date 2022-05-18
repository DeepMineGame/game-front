export enum ContractType {
    undefined,
    landlord_mineowner,
    mineowner_contractor,
}

export type ContractDto = {
    id: number;
    client_id: string;
    client_asset_id: string;
    executor_id: string;
    executor_asset_id: string;
    type: ContractType;
    expired_at: number;
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
};
