import { e_upg_asset_type } from 'features';
import { RarityType } from '../inventories';

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

export enum AssetType {
    UNDEFINED = 'UNDEFINED',
    CUTTER = 'CUTTER',
    WANDERING_REACTOR = 'WANDERING_REACTOR',
    PLUNGING_BLOCKS = 'PLUNGING_BLOCKS',
    DELAMINATOR = 'DELAMINATOR',
    DME_WIRE = 'DME_WIRE',
}

export enum ContractStatus {
    undefined,
    signed_by_client,
    signed_by_executor,
    active,
    terminated,
}
export enum RentalContractStatuses {
    SIGNED_BY_OWNER = 'SIGNED_BY_OWNER',
    SIGNED_BY_RENTER = 'SIGNED_BY_RENTER',
    ACTIVE = 'ACTIVE',
    TERMINATED = 'TERMINATED',
    COMPLETED = 'COMPLETED',
}

export enum RentalContractSubStatus {
    ACTIVE_EQUIPMENT_RETURNING = 'ACTIVE_EQUIPMENT_RETURNING',
    ACTIVE_EQUIPMENT_RETURNING_EXPIRED = 'ACTIVE_EQUIPMENT_RETURNING_EXPIRED',
    TERMINATED_BY_OWNER = 'TERMINATED_BY_OWNER',
    TERMINATED_BY_RENTER = 'TERMINATED_BY_RENTER',
    COMPLETED_BY_OWNER = 'COMPLETED_BY_OWNER',
    COMPLETED_BY_RENTER = 'COMPLETED_BY_RENTER',
}

export enum OrderState {
    undefined = '',
    OpenOrder = 'open_order',
    ValidContract = 'valid_contract',
    WaitingForAction = 'waiting_for_action',
    Completed = 'completed',
    Terminated = 'terminated',
}

export enum OrderSubState {
    undefined = '',
    // unsigned by client or executor
    Unsigned = 'unsigned',
    // active contract
    Active = 'active',
    // another side violate contract terms, contact not finished
    ViolateTerms = 'violate_terms',

    // user premature terminate the contract
    PrematureTerminated = 'premature_terminate',

    // order terminated
    Terminated = 'terminated',
    // order terminated, client collected penalty
    TerminatedWithPenalty = 'terminate_with_penalty',
    // order terminated, client chose not to collect penalty
    TerminatedWithoutPenalty = 'terminate_without_penalty',
    // order completed
    Completed = 'completed',
    // order completed, client collected penalty
    CompletedWithPenalty = 'completed_with_penalty',
    // order completed, client chose not to collect penalty
    CompletedWithoutPenalty = 'completed_without_penalty',
    // order terminated before both side singed
    Closed = 'closed',
}

export type AttrStatus = 'success' | 'failed' | 'failed_with_broke';

export type ContractAttrs = {
    asset_id_new: string;
    asset_id_old: string;
    asset_ids: string;
    asset_template_id: string;
    contract_id: number;
    cost_of_execution: number;
    engineer_exp: string;
    finished_by: string;
    improved_kit: 0 | 1;
    level: string;
    mine_sublevel: string;
    rarity: string;
    schema_type: string;
    status: AttrStatus;
    time_spent: number; // in seconds
    upgrade_failed: string;
    engineer_report_fetched?: boolean;
    asset_template_ids: string[];
    asset_types: e_upg_asset_type; // e_upg_asset_type with ','
    upgrade_statuses: AttrStatus[];
    upgrade_levels: string[];
    asset_ids_new: string[];
    asset_ids_old: string[];
    area_rarity: RarityType;
    mine_level: number | undefined;
};
export enum ViolationDto {
    FEE_NOT_ENOUGH_PAID = 'FEE_NOT_ENOUGH_PAID',
    ASSET_IS_BROKEN = 'ASSET_IS_BROKEN',
}

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
    status: ContractStatus | RentalContractStatuses;
    state: OrderState;
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
    rarity: RarityType | -1;
    level: number;
    deposit: number;
    autorenew_enabled: boolean;
    fee_counter: number;
    fee_counter_previous: number;
    computed?: {
        status: OrderState;
        sub_status: OrderSubState;
        terms_violated: boolean;
        premature_terminated: boolean;
        land_rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
        mine_level: number;
    };
    // rent contract
    owner?: string;
    substatus: RentalContractSubStatus;
    fee_min_amount?: string;
    assets?: [
        {
            asset_id: number;
            type: AssetType;
            level: number;
            rarity: number;
        }
    ];
    days_left?: number;
    renter: string;
    violations?: ViolationDto[];
    ins_dme_amount: string;
    ins_dmp_amount: string;
    ins_type: string;
    ins_wax_amount: string;
    assets_type: string;
    autorenew_at: number;
    fee_counter_total?: string;
};

export const contractName = {
    [ContractType.undefined]: null,
    [ContractType.landlord_mineowner]: 'Mine setup',
    [ContractType.mineowner_contractor]: 'Mining contract',
    [ContractType.level_upgrade]: 'Level Upgrade',
};

export const stateMap = {
    [OrderState.undefined]: '',
    [OrderState.OpenOrder]: 'Open order',
    [OrderState.Terminated]: 'Terminated',
    [OrderState.ValidContract]: 'Valid contract',
    [OrderState.Completed]: 'Completed',
    [OrderState.WaitingForAction]: 'Wait for action',
};
