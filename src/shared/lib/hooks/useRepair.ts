import { dmeToUpgrade, rarityMap, RarityType } from 'entities/smartcontract';
import { fromUnit } from '../utils/unit-parser';

export type GetCostParams = {
    level: keyof typeof dmeToUpgrade['Common'];
    rarity: Exclude<typeof rarityMap[RarityType], ''>;
    isRefurbish: boolean;
};

export const useRepair = () => {
    const getCost = ({ level, rarity, isRefurbish }: GetCostParams) => {
        const percent = isRefurbish ? 3000 + level * 100 : 150 + level * 100;
        const amount = dmeToUpgrade[rarity][level];

        return fromUnit(amount * percent);
    };

    return { getCost };
};
