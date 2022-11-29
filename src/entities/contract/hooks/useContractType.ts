import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';

export const useContractType = (contract: ContractDto) => {
    const isExecutorSigned =
        contract.status === ContractStatus.signed_by_executor;
    const isClientSigned = contract.status === ContractStatus.signed_by_client;

    const isOrder = [
        ContractStatus.signed_by_executor,
        ContractStatus.signed_by_client,
    ].includes(contract.status);

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
