import { useGate, useStore } from 'effector-react';
import { useMemo } from 'react';
import { UserActionGate } from 'features/user';
import {
    actionsStore,
    ActionType,
    dmeToUpgrade,
    rarityMap,
    RarityType,
    UserInventoryType,
} from 'entities/smartcontract';
import { useAccountName } from './useAccountName';

export type GetCostParams = {
    level: keyof typeof dmeToUpgrade['Common'];
    rarity: Exclude<typeof rarityMap[RarityType], ''>;
    isRefurbish: boolean;
};

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
        repairActions?.find(
            (action) => action.assetId === Number(asset?.asset_id)
        )?.finishesAt;

    const getCost = ({ level, rarity, isRefurbish }: GetCostParams) => {
        const percent = isRefurbish ? 3000 + level * 100 : 150 + level * 100;
        const amount = dmeToUpgrade[rarity][level];

        return amount * percent;
    };

    return { getFinishesAtTime, getCost };
};
