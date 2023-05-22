import { AssetDataType } from 'entities/atomicassets';
import { mineAssetTemplateId } from 'entities/smartcontract';
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
    const type = mineAssetTemplateId.includes(
        Number(equipment?.[0].template.template_id)
    )
        ? 'mine'
        : 'equipment';

    const timeModifier = getTimeModifier(upgradeKit);
    const priceModifier = getPriceModifier(upgradeKit, type);
    const { min: minTime, max: maxTime } = getMinMaxUpgradeTime(equipment);
    const isEquipmentSet = equipment?.length === EQUIPMENT_SET_LENGTH;

    const dmeToUpgrade = isEquipmentSet
        ? Number(equipment[0]?.data?.['DME to Upgrade']) * 5
        : Number(equipment?.[0]?.data?.['DME to Upgrade']) || 0;
    const price = Number((priceModifier / 100) * dmeToUpgrade).toFixed(2);

    return {
        price,
        timeModifier,
        priceModifier,
        minTime: minTime * (timeModifier / 100),
        maxTime: maxTime * (timeModifier / 100),
    };
};
