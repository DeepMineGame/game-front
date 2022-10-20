import {
    combine,
    createEffect,
    createEvent,
    createStore,
    sample,
    forward,
} from 'effector';
import { createGate } from 'effector-react';
import { getAssetStatus, Status } from 'shared';
import { findEquipmentByName } from 'features/equipmentSet';
import {
    ActionType,
    ACTION_STATE_TO_ID,
    ContractDto,
    ContractStatus,
    ContractType,
    getContractsNameConfig,
    getHistoryConfig,
    getUserConfig,
    InUseType,
    LOCATION_TO_ID,
    mapSearchParamForIndexPositionToFindContracts,
    miningEquipmentNames,
    UserHistoryType,
    UserInfoType,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    $mergedInventoryWithAtomicAssets,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { getTableData, isAssetAvailable } from 'shared/lib/utils';

const contractIsExpired = (contract: ContractDto) =>
    contract.finishes_at * 1000 < Date.now();
const contractWasTerminated = (contract: ContractDto) =>
    Boolean(contract.term_time);

type MiningEquipments = Record<string, UserInventoryType | undefined>;

const setMiningOverEvent = createEvent<boolean>();

const ContractorCabinGate = createGate<{ searchParam: string }>(
    'ContractorCabinGate'
);

const getLandlordContractsEffect = createEffect<
    { searchParam: string },
    { rows: ContractDto[] },
    Error
>(({ searchParam }) =>
    getTableData(
        getContractsNameConfig(
            searchParam,
            mapSearchParamForIndexPositionToFindContracts.executorId,
            1000
        )
    )
);

const getUserContractsEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(
            getContractsNameConfig(
                searchParam,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                1000
            )
        )
);

const getUserHistoryEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(getHistoryConfig(searchParam))
);

const getUserInfoEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(getUserConfig(searchParam))
);

const $landlordContract = createStore<ContractDto | null>(null).on(
    getLandlordContractsEffect.doneData,
    (_, { rows }) =>
        rows.find(
            ({ type, status }) =>
                type === ContractType.landlord_mineowner &&
                status === ContractStatus.active
        ) || null
);

const $userContracts = createStore<ContractDto[]>([]).on(
    getUserContractsEffect.doneData,
    (_, { rows }) => rows
);

const $userInfo = createStore<UserInfoType | null>(null).on(
    getUserInfoEffect.doneData,
    (_, { rows }) => rows?.[0]
);

const $mineOwnerContracts = combine(
    $userContracts,
    $userInfo,
    (userContracts, userInfo) =>
        userContracts.filter(
            ({ type, executor, status: contractStatus }) =>
                type === ContractType.mineowner_contractor &&
                executor === userInfo?.owner &&
                contractStatus === ContractStatus.active
        )
);

const $userHistory = createStore<UserHistoryType[]>([]).on(
    getUserHistoryEffect.doneData,
    (_, { rows }) => rows
);

const $hasMineOwnerContracts = createStore(false);
const $installedMiningEquipments = createStore<MergedInventoryWithAtomicAssets>(
    []
);
const $isNotFullEquipmentsSet = createStore(false);
const $activeMining = createStore<UserHistoryType | null>(null);
const $interruptedMining = createStore<UserHistoryType[]>([]);
const $miningOver = createStore(false);
const $miningEquipments = createStore<MiningEquipments | null>(null);
const $inLocation = createStore(false);
const $hasInstalledEquipment = createStore(false);
const $needFinishMineownerContract = createStore(false);
const $equipmentIsBroken = createStore(false);
const $landlordContractFinished = createStore(false);
const $miningContractIsntActive = createStore(false);

const $contractorCabin = combine(
    $hasMineOwnerContracts,
    $installedMiningEquipments,
    $isNotFullEquipmentsSet,
    $activeMining,
    $interruptedMining,
    $miningOver,
    $needFinishMineownerContract,
    $equipmentIsBroken,
    $landlordContractFinished,
    $miningContractIsntActive,
    (
        hasMineOwnerContracts,
        installedMiningEquipments,
        isNotFullEquipmentsSet,
        activeMining,
        interruptedMining,
        miningOver,
        needFinishMineownerContract,
        equipmentIsBroken,
        landlordContractFinished,
        miningContractIsntActive
    ) => ({
        hasMineOwnerContracts,
        installedMiningEquipments,
        isNotFullEquipmentsSet,
        activeMining,
        interruptedMining,
        miningOver,
        needFinishMineownerContract,
        equipmentIsBroken,
        landlordContractFinished,
        miningContractIsntActive,
    })
);

const $isContractorCabinLoading = combine(
    getUserContractsEffect.pending,
    getUserHistoryEffect.pending,
    getUserInfoEffect.pending,
    (...loadings) => loadings.some(Boolean)
);

sample({
    source: [
        $needFinishMineownerContract,
        $landlordContractFinished,
        $hasInstalledEquipment,
    ],
    target: $miningContractIsntActive,
    fn: ([
        needFinishMineownerContract,
        landlordContractFinished,
        hasInstalledEquipment,
    ]) =>
        (needFinishMineownerContract || landlordContractFinished) &&
        hasInstalledEquipment,
});

sample({
    source: $mineOwnerContracts,
    target: $needFinishMineownerContract,
    fn: (mineOwnerContracts) =>
        contractWasTerminated(mineOwnerContracts[0]) ||
        contractIsExpired(mineOwnerContracts[0]),
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
        (contractWasTerminated(landlordContract) ||
            contractIsExpired(landlordContract)),
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

        const miningEquipments = miningEquipmentNames.reduce<{
            [k: string]: UserInventoryType | undefined;
        }>((acc, name) => {
            acc[name] = findEquipmentByName(installedItems || [], name);

            return acc;
        }, {});

        return miningEquipments;
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
    to: [getUserContractsEffect, getUserInfoEffect, getUserHistoryEffect],
});

export {
    setMiningOverEvent,
    ContractorCabinGate,
    $userInfo,
    $activeMining,
    $miningEquipments,
    $contractorCabin,
    $inLocation,
    $isContractorCabinLoading,
    $hasInstalledEquipment,
    $mineOwnerContracts,
    $landlordContract,
};

export type ContractorCabinStore = ReturnType<
    typeof $contractorCabin['getState']
>;
