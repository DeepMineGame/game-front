import { EngineerSchema, InventoryTab } from 'entities/smartcontract';
import { CabinStatus } from './types';

export const INAUGURATION_STATUSES = [
    CabinStatus.NeedCertificate,
    CabinStatus.NeedTravel,
    CabinStatus.NeedInauguration,
];
export const WORK_STATUSES = [CabinStatus.UpgradeInProgress];

export const ACTIVE_STATUSES = [
    CabinStatus.NeedContract,
    CabinStatus.NeedTraining,
    CabinStatus.UnlockingSkill,
    CabinStatus.NeedCitizen,
    CabinStatus.NeedUpgrade,
    CabinStatus.UpgradeCompleted,
    CabinStatus.ShowStats,
    CabinStatus.CanSeeStats,
];

export const inventoriesTabMap: Record<EngineerSchema, InventoryTab> = {
    [EngineerSchema.undefined]: InventoryTab.equipment,
    [EngineerSchema.equipment]: InventoryTab.equipment,
    [EngineerSchema.factory]: InventoryTab.equipment,
    [EngineerSchema.mine]: InventoryTab.mines,
    [EngineerSchema.module]: InventoryTab.modules,
};
