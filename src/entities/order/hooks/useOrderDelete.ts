import { useContractType } from 'entities/contract';
import { ContractDto } from 'entities/smartcontract';

export const useOrderDelete = (contract: ContractDto, accountName: string) => {
    const { isExecutorSigned, isClientSigned } = useContractType(contract);

    const canDeleteOrder =
        (isExecutorSigned && contract.executor === accountName) ||
        (isClientSigned && contract.client === accountName);

    return { canDeleteOrder };
};
