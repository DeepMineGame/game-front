import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';

export const useContractType = (contract: ContractDto) => {
    const isExecutorSigned =
        contract.status === ContractStatus.signed_by_executor;
    const isClientSigned = contract.status === ContractStatus.signed_by_client;

    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;
    const isMineOperationContract =
        contract.type === ContractType.landlord_mineowner;

    return {
        isExecutorSigned,
        isClientSigned,
        isMiningContract,
        isMineOperationContract,
    };
};
