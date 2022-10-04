import { ContractDto } from 'entities/smartcontract';

export const getUpgradeTimeLeft = (contract: ContractDto): number => {
    return ((contract?.finishes_at || 0) - (contract?.start_time || 0)) * 1000;
};
