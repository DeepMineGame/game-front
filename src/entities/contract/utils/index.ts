import { ContractDto, ContractStatus } from 'entities/smartcontract';

export const getActiveSelfSignedContract = (contract: ContractDto) => {
    return (
        contract.client === contract.executor &&
        contract.deadline_time * 1000 > Date.now() &&
        contract.activation_time !== 0 &&
        contract.status === ContractStatus.active
    );
};

export const getNotSignedSelfContract = (contract: ContractDto) => {
    return (
        contract.client === contract.executor &&
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
