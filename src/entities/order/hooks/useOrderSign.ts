import { useContractType } from 'entities/contract';
import { ContractDto } from 'entities/smartcontract';
import { UserRoleState } from 'shared/lib/hooks';

export const useOrderSign = (
    contract: ContractDto,
    accountName: string,
    userRoles: Partial<UserRoleState> = {}
) => {
    const {
        isClientSigned,
        isExecutorSigned,
        isMiningContract: isMiningOrder,
        isMineOperationContract: isMineOperationOrder,
        isSelfSigned,
    } = useContractType(contract);

    const isUserClient = contract.client === accountName;
    const isUserNotClient = !isUserClient;
    const isUserNotExecutor = contract.executor !== accountName;

    const isUserSelfContract = isUserClient && isSelfSigned;

    const canSignMiningMineOwnerOrder =
        isMiningOrder &&
        isClientSigned &&
        (isUserNotClient || isUserSelfContract);

    const canSignMiningContractorOrder =
        isMiningOrder && isExecutorSigned && isUserNotExecutor;

    const canSignOperationLandlordOrder =
        isMineOperationOrder &&
        isClientSigned &&
        (isUserNotClient || isUserSelfContract);

    const canSignOperationMineOwnerOrder =
        isMineOperationOrder &&
        isExecutorSigned &&
        isUserNotExecutor &&
        userRoles?.isLandlord;

    const signState = {
        canSignMiningContractorOrder,
        canSignMiningMineOwnerOrder,
        canSignOperationLandlordOrder,
        canSignOperationMineOwnerOrder,
    };

    return signState;
};
