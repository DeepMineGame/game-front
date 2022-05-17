export const contractorCabin = '/contractor-cabin';
export const equipmentSet = '/equipment-set';
export const mining = '/mining';

export enum CABIN_STATUS {
    undefined,
    sign_contract,
    welcome,
    setup,
    ready,
    mining_progress,
    mining_interrupted,
    mining_over,
}
