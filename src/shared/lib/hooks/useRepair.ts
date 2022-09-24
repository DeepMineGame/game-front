import { useGate, useStore } from 'effector-react';
import { useMemo } from 'react';
import { UserActionGate } from 'features/user';
import {
    actionsStore,
    ActionType,
    UserInventoryType,
} from 'entities/smartcontract';
import { useAccountName } from './useAccountName';

export const useRepair = () => {
    const accountName = useAccountName();
    useGate(UserActionGate, { searchParam: accountName });
    const actions = useStore(actionsStore);

    const repairActions = useMemo(
        () =>
            actions
                ?.filter(({ type }) => type === ActionType.equipment_repair)
                .map(({ finishes_at, attrs }) => ({
                    finishesAt: finishes_at,
                    assetId: attrs[0]?.value,
                })),
        [actions]
    );

    const getFinishesAtTime = (asset: UserInventoryType) =>
        repairActions?.find((rA) => rA.assetId === Number(asset.asset_id))
            ?.finishesAt;

    return { getFinishesAtTime };
};
