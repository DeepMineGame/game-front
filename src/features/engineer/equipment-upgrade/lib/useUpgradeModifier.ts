import { AssetDataType } from 'entities/atomicassets';
import { UpgradeKitType } from '../model/upgrade-kit';
import { EQUIPMENT_SET_LENGTH } from '../constants';
import {
    getMinMaxUpgradeTime,
    getPriceModifier,
    getTimeModifier,
} from './index';

export const useUpgradeModifiers = (
    upgradeKit: UpgradeKitType,
    equipment: AssetDataType[] | null
) => {
    const timeModifier = getTimeModifier(upgradeKit);
    const priceModifier = getPriceModifier(upgradeKit);
    const { min: minTime, max: maxTime } = getMinMaxUpgradeTime(equipment);
    const isEquipmentSet = equipment?.length === EQUIPMENT_SET_LENGTH;
    const dmeToUpgrade = isEquipmentSet
        ? Number(equipment[0]?.data?.['DME to Upgrade']) * 5
        : Number(equipment?.[0]?.data?.['DME to Upgrade']) || 0;
    const price = (priceModifier / 100) * dmeToUpgrade;

    return {
        price,
        timeModifier,
        priceModifier,
        minTime: minTime * (timeModifier / 100),
        maxTime: maxTime * (timeModifier / 100),
    };
};
