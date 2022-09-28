import { useGate, useStore } from 'effector-react';
import { useMemo } from 'react';
import { UserActionGate } from 'features/user';
import {
    actionsStore,
    ActionType,
    rarityMap,
    RarityType,
    UserInventoryType,
} from 'entities/smartcontract';
import { useAccountName } from './useAccountName';
import { dmeToUpgradeValues } from './constants';

export type GetCostParams = {
    level: keyof typeof dmeToUpgradeValues['Common'];
    rarity: Exclude<typeof rarityMap[RarityType], ''>;
    isRefurbish: boolean;
};

const getAmountByPercent = ({
    amount,
    percent,
}: {
    amount: number;
    percent: number;
}) => (amount * percent) / 10000;

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
            (action) => action.assetId === Number(asset.asset_id)
        )?.finishesAt;

    const getCost = ({ level, rarity, isRefurbish }: GetCostParams) => {
        let percent = !isRefurbish ? 150 : 3000;
        const dmeToUpgrade = dmeToUpgradeValues[rarity][level];

        if (level === 1) {
            percent = !isRefurbish ? 250 : 3100;
        } else if (level === 2) {
            percent = !isRefurbish ? 350 : 3200;
        } else if (level === 3) {
            percent = !isRefurbish ? 450 : 3300;
        } else if (level === 4) {
            percent = !isRefurbish ? 550 : 3400;
        } else if (level === 5) {
            percent = !isRefurbish ? 650 : 3500;
        } else if (level === 6) {
            percent = !isRefurbish ? 750 : 3600;
        } else if (level === 7) {
            percent = !isRefurbish ? 850 : 3700;
        } else if (level === 8) {
            percent = !isRefurbish ? 950 : 3800;
        } else if (level === 9) {
            percent = !isRefurbish ? 1050 : 3900;
        }

        return getAmountByPercent({ amount: dmeToUpgrade, percent });
    };

    return { getFinishesAtTime, getCost };
};
