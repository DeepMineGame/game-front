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
    deadline_duration_in_days: number;
    deadline_duration_in_hours: number;
    deposit: number;
};

export type MineOrder = BaseOrder & {
    fee_percent: number;
    contract_duration: number;
    opt_level?: number | null;
    opt_rarity?: RarityType | null;
    deposit: number;
    autorenew_enabled?: boolean;
};

export type LevelUpgradeOrder = BaseOrder & {
    cost_of_execution: number;
    opt_schema_type: EngineerSchema;
    opt_level: number;
    opt_rarity: RarityType;
    opt_asset_id1: number;
    opt_asset_id2: number;
    opt_asset_id3: number;
    opt_asset_id4: number;
    opt_asset_id5: number;
};

export const orderFields = {
    waxUser: 'wax_user',
    contractType: 'contract_type',
    assetId: 'opt_asset_id',
    assetId1: 'opt_asset_id1',
    assetId2: 'opt_asset_id2',
    assetId3: 'opt_asset_id3',
    assetId4: 'opt_asset_id4',
    assetId5: 'opt_asset_id5',
    isClient: 'is_client',
    optClient: 'opt_client',
    optExecutor: 'opt_executor',
    feePercent: 'fee_percent',
    feeDailyMinAmount: 'fee_daily_min_amount',
    contractDuration: 'contract_duration',
    costOfExecution: 'cost_of_execution',
    optSchema: 'opt_schema_type',
    optLevel: 'opt_level',
    optRarity: 'opt_rarity',
    deadlineDurationInDays: 'deadline_duration_in_days',
    deadlineDurationInHours: 'deadline_duration_in_hours',
    deposit: 'deposit',
    autorenew_enabled: 'autorenew_enabled',
} as const;
