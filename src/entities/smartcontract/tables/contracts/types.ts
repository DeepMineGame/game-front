export enum ContractType {
    undefined,
    landlord_mineowner,
    mineowner_contractor,
    level_upgrade,
}

export enum ContractRole {
    executor,
    client,
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

export const statusColorMap = {
    [ContractStatus.undefined]: null,
    [ContractStatus.signed_by_client]: '#F5C913', // primary6
    [ContractStatus.signed_by_executor]: '#F5C913', // primary6
    [ContractStatus.active]: '#47FF40', // green6
    [ContractStatus.terminated]: '#5A5A5A', // neutral6
};

export type AttrStatus = 'success' | 'failed' | 'failed_with_broke';

export type ContractAttrs = {
    asset_id_new: string;
    asset_id_old: string;
    asset_template_id: string;
    contract_id: number;
    cost_of_execution: number;
    engineer_exp: string;
    finished_by: string;
    improved_kit: 0 | 1;
    level: string;
    rarity: string;
    schema_type: string;
    status: AttrStatus;
    time_spent: number; // in seconds
    upgrade_failed: string;
    engineer_report_fetched?: boolean;
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
    create_time: number;
    activation_time: number;
    start_time: number;
    deadline_time: number;
    deleted_at: number;
    term_time: number;
    deadline_duration: number;
    contract_duration: number;
    term_initiator: string;
    finishes_at: number;
    status: ContractStatus;
    min_amount: number;
    client_warranty_amount: number;
    executor_warranty_amount: number;
    attrs: {
        key: keyof ContractAttrs;
        value: string;
    }[];
    signed_by_client: number;
    signed_by_executor: number;
    cost_of_execution: number;
    client_discord: string;
    executor_discord: string;
    rarity: number;
    level: number;
    deposit: number;
    autorenew_enabled: boolean;
    fee_counter: number;
};

export const contractName = {
    [ContractType.undefined]: null,
    [ContractType.landlord_mineowner]: 'Mine setup',
    [ContractType.mineowner_contractor]: 'Mining contract',
    [ContractType.level_upgrade]: 'Level Upgrade',
};
