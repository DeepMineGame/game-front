import { AssetDataType } from 'entities/atomicassets';
import upgrades from '../data/upgrade-time.json';
import timeModification from '../data/time-modification.json';
import priceModification from '../data/price-modification.json';
import { UpgradeKitType } from '../model/upgrade-kit';

const getMinMaxUpgradeTime = (equipment: AssetDataType | null) => {
    const level = `${equipment?.data?.level || 0}`;
    const { mine } = upgrades;

    return mine[level as keyof typeof mine];
};

const getTimeModifier = (upgradeKit: UpgradeKitType) => {
    const { mine } = timeModification;

    return mine[upgradeKit];
};

const getPriceModifier = (upgradeKit: UpgradeKitType) => {
    const { mine } = priceModification;

    return mine[upgradeKit];
};

export { getMinMaxUpgradeTime, getPriceModifier, getTimeModifier };
