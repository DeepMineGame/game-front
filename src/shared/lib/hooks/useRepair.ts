import { dmeToUpgrade, rarityMap, RarityType } from 'entities/smartcontract';

export type GetCostParams = {
    level: keyof typeof dmeToUpgrade['Common'];
    rarity: Exclude<typeof rarityMap[RarityType], ''>;
    isRefurbish: boolean;
};

export const useRepair = () => {
    const getCost = ({ level, rarity, isRefurbish }: GetCostParams) => {
        const percent = isRefurbish ? 3000 + level * 100 : 150 + level * 100;
        const amount = dmeToUpgrade[rarity][level];

        return (amount * percent) / 10 ** 8;
    };

    return { getCost };
};
