export enum CabinStatus {
    NeedCertificate,
    NeedTravel,
    NeedInauguration,
    NeedTraining,
    UnlockingSkill,
    NeedContract,
    NeedCitizen,
    NeedUpgrade,
    UpgradeInProgress,
    UpgradeCompleted,
    CanSeeStats,
    ShowStats,
}

export enum CabinState {
    NotInaugurated = 'notInaugurated',
    Idle = 'idle',
    Active = 'active',
    Work = 'work',
}
