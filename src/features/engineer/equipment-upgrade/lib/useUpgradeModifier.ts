import { AssetDataType } from 'entities/atomicassets';
import { getDmeAmount } from 'shared/lib/utils';
import { UpgradeKitType } from '../model/upgrade-kit';
import {
    getMinMaxUpgradeTime,
    getPriceModifier,
    getTimeModifier,
} from './index';

export const useUpgradeModifiers = (
    upgradeKit: UpgradeKitType,
    equipment: AssetDataType | null
) => {
    const timeModifier = getTimeModifier(upgradeKit);
    const priceModifier = getPriceModifier(upgradeKit);
    const { min: minTime, max: maxTime } = getMinMaxUpgradeTime(equipment);

    const price = getDmeAmount(
        (priceModifier / 100) *
            (Number(equipment?.data?.['DME to upgrade']) || 0)
    );

    return {
        price,
        timeModifier,
        priceModifier,
        minTime: minTime * (timeModifier / 100),
        maxTime: maxTime * (timeModifier / 100),
    };
};
