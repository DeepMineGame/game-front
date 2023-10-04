import { ContractDto, ContractStatus } from 'entities/smartcontract';
import { AssetDataType } from 'entities/atomicassets';
import upgrades from '../data/upgrade-time.json';
import timeModification from '../data/time-modification.json';
import priceModification from '../data/price-modification.json';
import { UpgradeKitType } from '../model/upgrade-kit';
import { EQUIPMENT_SET_LENGTH } from '../constants';

const getMinMaxUpgradeTime = (equipment: AssetDataType[] | null) => {
    const { mine } = upgrades;
    const isEquipmentSet = equipment?.length === EQUIPMENT_SET_LENGTH;

    const level = isEquipmentSet
        ? `${equipment[0]?.data?.level || 0}`
        : `${equipment?.[0]?.data?.level || 0}`;

    return mine[level as keyof typeof mine];
};

const getTimeModifier = (upgradeKit: UpgradeKitType) => {
    const { mine } = timeModification;

    return mine[upgradeKit];
};

const getPriceModifier = (
    upgradeKit: UpgradeKitType,
    type: 'mine' | 'equipment'
) => {
    return priceModification[type][upgradeKit];
};

const isEngineerRequestedReport = (contract: ContractDto) =>
    contract.attrs.some(({ key }) => key === 'engineer_report_fetched');

const getContractWithoutReport = (contracts: ContractDto[]) =>
    contracts.find(
        (contract) =>
            contract.deleted_at > 0 &&
            contract.start_time > 0 &&
            !contract.term_time &&
            !isEngineerRequestedReport(contract)
    );

const getEngineerActiveContract = (
    user?: string,
    contracts?: ContractDto[] | null
) => {
    const withoutReport = getContractWithoutReport(contracts || []);

    if (withoutReport && withoutReport.executor === user) {
        return withoutReport;
    }

    return (contracts || []).find(
        (contract) =>
            !contract.deleted_at &&
            contract.executor === user &&
            contract.status === ContractStatus.active
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
    isEngineerRequestedReport,
    getContractWithoutReport,
    getMinMaxUpgradeTime,
    getPriceModifier,
    getTimeModifier,
    getEngineerActiveContract,
    getEngineerCompletedContracts,
    getUpgradeKitType,
};
