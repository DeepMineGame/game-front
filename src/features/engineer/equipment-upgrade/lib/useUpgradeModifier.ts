import { AssetDataType } from 'entities/atomicassets';
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

    const price =
        (priceModifier / 100) *
        (Number(equipment?.data?.['DME to Upgrade']) || 0);

    return {
        price,
        timeModifier,
        priceModifier,
        minTime: minTime * (timeModifier / 100),
        maxTime: maxTime * (timeModifier / 100),
    };
};
