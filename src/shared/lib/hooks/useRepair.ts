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

        let repairPercentPivot;

        switch (rarity) {
            case rarityMap['1']:
                repairPercentPivot = 26.8;
                break;
            case rarityMap['2']:
                repairPercentPivot = 11.6;
                break;
            case rarityMap['3']:
                repairPercentPivot = 8.2;
                break;
            case rarityMap['4']:
                repairPercentPivot = 5.6;
                break;
            case rarityMap['5']:
                repairPercentPivot = 4;
                break;
            default:
                repairPercentPivot = 26.8;
        }

        let refurbishPercentPivot;

        switch (rarity) {
            case rarityMap['1']:
                refurbishPercentPivot = 80.4;
                break;
            case rarityMap['2']:
                refurbishPercentPivot = 34.8;
                break;
            case rarityMap['3']:
                refurbishPercentPivot = 24.6;
                break;
            case rarityMap['4']:
                refurbishPercentPivot = 16.8;
                break;
            case rarityMap['5']:
                refurbishPercentPivot = 12;
                break;
            default:
                refurbishPercentPivot = 80.4;
        }

        // extra zeros by reducing zeros in dmeToUpgrade
        const percent = isRefurbish
            ? refurbishPercentPivot * ONE_HUNDRED_PERCENT
            : repairPercentPivot * ONE_HUNDRED_PERCENT;
        const amount = dmeToUpgrade[rarity][level];

        return Number((amount * percent) / 10 ** 8).toFixed(2);
    };

    return { getCost };
};
