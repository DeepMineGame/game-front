import {
    ContractRole,
    ContractType,
    EngineerSchema,
    RarityType,
} from 'entities/smartcontract';

export type BaseOrder = {
    wax_user: string;
    contract_type: ContractType;
    opt_asset_id: number;
    is_client: ContractRole;
    opt_client?: string;
    opt_executor?: string;
    penalty_amount: number;
    deadline_duration_in_days: number;
    deadline_duration_in_hours: number;
};

export type MineOrder = BaseOrder & {
    fee_percent: number;
    fee_daily_min_amount: number;
    days_for_penalty: number;
    contract_duration: number;
    opt_level: number | null;
    opt_rarity: RarityType | null;
};

export type LevelUpgradeOrder = BaseOrder & {
    cost_of_execution: number;
    opt_schema_type: EngineerSchema;
    opt_level: number;
    opt_rarity: RarityType;
};

export const orderFields = {
    waxUser: 'wax_user',
    contractType: 'contract_type',
    assetId: 'opt_asset_id',
    isClient: 'is_client',
    optClient: 'opt_client',
    optExecutor: 'opt_executor',
    penaltyAmount: 'penalty_amount',
    feePercent: 'fee_percent',
    feeDailyMinAmount: 'fee_daily_min_amount',
    daysForPenalty: 'days_for_penalty',
    contractDuration: 'contract_duration',
    costOfExecution: 'cost_of_execution',
    optSchema: 'opt_schema_type',
    optLevel: 'opt_level',
    optRarity: 'opt_rarity',
    deadlineDurationInDays: 'deadline_duration_in_days',
    deadlineDurationInHours: 'deadline_duration_in_hours',
} as const;
