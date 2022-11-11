import { ContractDto } from 'entities/smartcontract';

export const useContractInfo = (contract: ContractDto, accountName: string) => {
    const isClient = contract.client === accountName;
    const isExecutor = contract.executor === accountName;
    const isTermInitiator = contract.term_initiator === accountName;

    return { isClient, isExecutor, isTermInitiator };
};
