import { combine, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { getAssetStatus, Status } from 'shared';
import { findEquipmentByName } from 'features/equipment-set';
import {
    ACTION_STATE_TO_ID,
    ActionType,
    InUseType,
    isStatusTerminated,
    isTimeFinished,
    LOCATION_TO_ID,
    miningEquipmentNames,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    $mergedInventoryWithAtomicAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { isAssetAvailable } from 'shared/lib/utils';
import {
    getLandlordContractsEffect,
    getLastMiningStatusEffect,
    getUserContractsEffect,
    getUserHistoryEffect,
    getUserInfoEffect,
    setMiningOverEvent,
} from './effects';
import {
    $activeMining,
    $equipmentIsBroken,
    $hasInstalledEquipment,
    $hasMineOwnerContracts,
    $inLocation,
    $installedMiningEquipments,
    $interruptedMining,
    $isNotFullEquipmentsSet,
    $landlordContract,
    $landlordContractFinished,
    $mineOwnerContracts,
    $miningContractIsntActive,
    $miningEquipments,
    $miningOver,
    $needFinishMineownerContract,
    $userHistory,
    $userInfo,
} from './stores';

export const ContractorCabinGate = createGate<{ searchParam: string }>(
    'ContractorCabinGate'
);

sample({
    source: combine(
        $mineOwnerContracts,
        $hasInstalledEquipment,
        (mineOwnerContracts, hasInstalledEquipment) => ({
            mineOwnerContract: mineOwnerContracts[0],
            hasInstalledEquipment,
        })
    ),
    target: $miningContractIsntActive,
    fn: ({ mineOwnerContract, hasInstalledEquipment }) =>
        Boolean(mineOwnerContract?.term_time) && hasInstalledEquipment,
});

sample({
    source: $mineOwnerContracts,
    target: $needFinishMineownerContract,
    fn: (mineOwnerContracts) =>
        mineOwnerContracts[0] &&
        (isStatusTerminated(mineOwnerContracts[0]) ||
            isTimeFinished(mineOwnerContracts[0])),
});

sample({
    source: $installedMiningEquipments,
    target: $equipmentIsBroken,
    fn: (installedMiningEquipments) =>
        installedMiningEquipments.some(
            (asset) =>
                getAssetStatus(asset) === Status.broken ||
                !isAssetAvailable(asset)
        ),
});

sample({
    source: $landlordContract,
    target: $landlordContractFinished,
    fn: (landlordContract) =>
        !!landlordContract &&
        (isStatusTerminated(landlordContract) ||
            isTimeFinished(landlordContract)),
    filter: (landlordContract) => !!landlordContract,
});

sample({
    source: $installedMiningEquipments,
    target: $hasInstalledEquipment,
    fn: (installedMiningEquipments) =>
        Object.values(installedMiningEquipments)?.some(
            (item) => item?.in_use === InUseType.inUse
        ),
});

sample({
    source: $miningEquipments,
    target: $installedMiningEquipments,
    fn: (miningEquipments) => {
        const installedMiningEquipments = Object.values(
            miningEquipments || {}
        ).filter((miningEquipment) => miningEquipment);

        return installedMiningEquipments as MergedInventoryWithAtomicAssets;
    },
});

sample({
    source: $mergedInventoryWithAtomicAssets,
    target: $miningEquipments,
    fn: (inventoriedAssets) => {
        const installedItems = inventoriedAssets.filter(({ in_use }) => in_use);

        return miningEquipmentNames.reduce<{
            [k: string]: UserInventoryType | undefined;
        }>((acc, name) => {
            acc[name] = findEquipmentByName(installedItems || [], name);

            return acc;
        }, {});
    },
});

sample({
    source: $miningEquipments,
    target: $isNotFullEquipmentsSet,
    fn: (miningEquipments) => {
        const isNotFullEquipmentsSet =
            miningEquipments &&
            Object.values(miningEquipments).some(
                (miningEquipment) => !miningEquipment
            );

        return Boolean(isNotFullEquipmentsSet);
    },
});

sample({
    source: $userHistory,
    target: $activeMining,
    fn: (userHistory) =>
        userHistory.find(
            (item) =>
                item.type === ActionType.mine &&
                item.state === ACTION_STATE_TO_ID.active
        ) || null,
});

sample({
    source: $userHistory,
    target: $interruptedMining,
    fn: (userHistory) =>
        userHistory.filter(
            (item) => item.state === ACTION_STATE_TO_ID.interrupted
        ),
});

sample({
    source: $mineOwnerContracts,
    target: $hasMineOwnerContracts,
    fn: (mineOwnerContracts) => mineOwnerContracts.length !== 0,
});

sample({
    source: $userInfo,
    target: $inLocation,
    fn: (userInfo) => userInfo?.location === LOCATION_TO_ID.mine,
});

sample({
    source: $mineOwnerContracts,
    target: getLandlordContractsEffect,
    fn: (mineOwnerContracts) => ({ searchParam: mineOwnerContracts[0].client }),
    filter: (mineOwnerContracts) => !!mineOwnerContracts.length,
});

forward({
    from: setMiningOverEvent,
    to: $miningOver,
});

forward({
    from: ContractorCabinGate.open,
    to: [
        getUserContractsEffect,
        getUserInfoEffect,
        getUserHistoryEffect,
        getLastMiningStatusEffect,
    ],
});

export * from './stores';
export { setMiningOverEvent } from './effects';
