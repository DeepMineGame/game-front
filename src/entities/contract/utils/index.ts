import { ContractDto, ContractStatus } from 'entities/smartcontract';

export const getActiveSelfSignedContract = (contract: ContractDto) => {
    return (
        contract.client === contract.executor &&
        contract.status === ContractStatus.active
    );
};

export const getNotSignedContract = (contract: ContractDto) => {
    return (
        contract.activation_time === 0 &&
        contract.deleted_at === 0 &&
        contract.status !== ContractStatus.terminated
    );
};

export const getActiveOrderByType = (contract: ContractDto) => {
    return (
        contract.client !== contract.executor &&
        contract.activation_time === 0 &&
        contract.deleted_at === 0 &&
        contract.status !== ContractStatus.terminated
    );
};
