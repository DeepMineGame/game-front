export enum ContractorCabinStatus {
    undefined,
    sign_contract,
    not_full_equipments_set,
    no_equipments,
    ready,
    mining_progress,
    mining_interrupted,
    mining_over,
}

export enum LastMiningStatus {
    success = 'success',
    failed = 'failed',
    interrupted = 'interrupted',
}
