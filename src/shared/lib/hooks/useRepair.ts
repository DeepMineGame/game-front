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
                percentPivot = 28.5;
                break;
            case rarityMap['2']:
                percentPivot = 13.72;
                break;
            case rarityMap['3']:
                percentPivot = 9.46;
                break;
            case rarityMap['4']:
                percentPivot = 7;
                break;
            case rarityMap['5']:
                percentPivot = 4.5;
                break;
            default:
                percentPivot = 28.5;
        }
        // extra zeros by reducing zeros in dmeToUpgrade
        const percent = isRefurbish ? 3000 : percentPivot * ONE_HUNDRED_PERCENT;
        const amount = dmeToUpgrade[rarity][level];

        return (amount * percent) / 10 ** 8;
    };

    return { getCost };
};
