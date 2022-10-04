import { ContractDto } from 'entities/smartcontract';
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

const getEngineerActiveContract = (
    user?: string,
    contracts?: ContractDto[] | null
) => {
    return (contracts || []).find(
        (contract) => !contract.deleted_at && contract.executor === user
    );
};

const getEngineerCompletedContracts = (
    user?: string,
    contracts?: ContractDto[] | null
) => {
    return (contracts || []).filter(
        (contract) => !!contract.deleted_at && contract.executor === user
    );
};

const getUpgradeKitType = (contract?: ContractDto) => {
    const upgradeKitType = contract?.attrs.find(
        ({ key }) => key === 'improved_kit'
    )?.value;

    const kitType =
        {
            0: UpgradeKitType.common,
            1: UpgradeKitType.uncommon,
        }[upgradeKitType!] ?? null;

    return kitType;
};

export {
    getMinMaxUpgradeTime,
    getPriceModifier,
    getTimeModifier,
    getEngineerActiveContract,
    getEngineerCompletedContracts,
    getUpgradeKitType,
};
