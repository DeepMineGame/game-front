import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';

export const useContractType = (contract: ContractDto) => {
    const isExecutorSigned =
        contract.status === ContractStatus.signed_by_executor;
    const isClientSigned = contract.status === ContractStatus.signed_by_client;
    const isTerminated = contract.status === ContractStatus.terminated;

    const isOrder =
        isExecutorSigned ||
        isClientSigned ||
        (isTerminated && !contract.activation_time);

    const isContract = isClientSigned && isExecutorSigned;

    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;
    const isMineOperationContract =
        contract.type === ContractType.landlord_mineowner;
    const isLevelUpgradeContract = contract.type === ContractType.level_upgrade;

    return {
        isExecutorSigned,
        isClientSigned,
        isMiningContract,
        isMineOperationContract,
        isLevelUpgradeContract,
        isOrder,
        isContract,
    };
};
