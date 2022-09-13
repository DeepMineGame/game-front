export enum CabinStatus {
    NeedCertificate,
    NeedTravel,
    NeedInauguration,
    NeedTraining,
    NeedWork,
    NeedUpgradeKit,
    UpgradeInProgress,
    UpgradeCompleted,
    CanSeeStats,
    ShowStats,
}

export enum CabinState {
    Idle = 'idle',
    Active = 'active',
    Work = 'work',
}
