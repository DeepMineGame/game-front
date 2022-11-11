import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';

export const useContractType = (contract: ContractDto) => {
    const isExecutorSigned =
        contract.status === ContractStatus.signed_by_executor;
    const isClientSigned = contract.status === ContractStatus.signed_by_client;
    const isOrder = !contract.client || !contract.executor;

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
    };
};
