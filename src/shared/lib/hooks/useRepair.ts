import { dmeToUpgrade, rarityMap, RarityType } from 'entities/smartcontract';

export type GetCostParams = {
    level: keyof typeof dmeToUpgrade['Common'];
    rarity: Exclude<typeof rarityMap[RarityType], ''>;
    isRefurbish: boolean;
};

const ONE_HUNDRED_PERCENT = 100;

export const useRepair = () => {
    const getCost = ({ level, rarity, isRefurbish }: GetCostParams) => {
        // if (level === 0 && !isRefurbish) {
        //     return 0;
        // }

        let percentPivot;

        switch (rarity) {
            case rarityMap['1']:
                percentPivot = 26.8;
                break;
            case rarityMap['2']:
                percentPivot = 11.6;
                break;
            case rarityMap['3']:
                percentPivot = 8.2;
                break;
            case rarityMap['4']:
                percentPivot = 6;
                break;
            case rarityMap['5']:
                percentPivot = 4;
                break;
            default:
                percentPivot = 26.8;
        }
        // extra zeros by reducing zeros in dmeToUpgrade
        const percent = isRefurbish ? 3000 : percentPivot * ONE_HUNDRED_PERCENT;
        const amount = dmeToUpgrade[rarity][level];

        return (amount * percent) / 10 ** 8;
    };

    return { getCost };
};
