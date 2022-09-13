import { CabinStatus } from './types';

export const IDLE_STATUSES = [
    CabinStatus.NeedCertificate,
    CabinStatus.NeedTravel,
    CabinStatus.NeedInauguration,
];
export const WORK_STATUSES = [CabinStatus.UpgradeInProgress];

export const ACTIVE_STATUSES = [
    CabinStatus.NeedWork,
    CabinStatus.NeedTraining,
    CabinStatus.NeedUpgradeKit,
    CabinStatus.UpgradeCompleted,
    CabinStatus.ShowStats,
    CabinStatus.CanSeeStats,
];
