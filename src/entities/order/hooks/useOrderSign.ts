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
        isLevelUpgradeContract: isLevelUpgradeOrder,
    } = useContractType(contract);

    const isUserNotClient = contract.client !== accountName;
    const isUserNotExecutor = contract.executor !== accountName;

    const canSignMiningMineOwnerOrder =
        isMiningOrder && isClientSigned && isUserNotClient;

    const canSignMiningContractorOrder =
        isMiningOrder && isExecutorSigned && isUserNotExecutor;

    const canSignOperationLandlordOrder =
        isMineOperationOrder && isClientSigned && isUserNotClient;

    const canSignOperationMineOwnerOrder =
        isMineOperationOrder &&
        isExecutorSigned &&
        isUserNotExecutor &&
        userRoles?.isLandlord;

    const canSignLevelUpgradeOrder = isLevelUpgradeOrder && isUserNotClient;

    const signState = {
        canSignMiningContractorOrder,
        canSignMiningMineOwnerOrder,
        canSignOperationLandlordOrder,
        canSignOperationMineOwnerOrder,
        canSignLevelUpgradeOrder,
    };

    return signState;
};
