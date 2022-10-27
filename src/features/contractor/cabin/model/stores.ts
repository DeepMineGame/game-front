import { combine, createStore } from 'effector';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    UserHistoryType,
    UserInfoType,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    getLandlordContractsEffect,
    getUserContractsEffect,
    getUserHistoryEffect,
    getUserInfoEffect,
} from './effects';

type MiningEquipments = Record<string, UserInventoryType | undefined>;

const $userContracts = createStore<ContractDto[]>([]).on(
    getUserContractsEffect.doneData,
    (_, rows) => rows
);

export const $landlordContract = createStore<ContractDto | null>(null).on(
    getLandlordContractsEffect.doneData,
    (_, rows) =>
        rows.find(
            ({ type, status }) =>
                type === ContractType.landlord_mineowner &&
                status === ContractStatus.active
        ) || null
);

export const $userInfo = createStore<UserInfoType | null>(null).on(
    getUserInfoEffect.doneData,
    (_, [userInfo]) => userInfo
);

export const $mineOwnerContracts = combine(
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

export const $userHistory = createStore<UserHistoryType[]>([]).on(
    getUserHistoryEffect.doneData,
    (_, rows) => rows
);

export const $hasMineOwnerContracts = createStore(false);
export const $installedMiningEquipments =
    createStore<MergedInventoryWithAtomicAssets>([]);
export const $isNotFullEquipmentsSet = createStore(false);
export const $activeMining = createStore<UserHistoryType | null>(null);
export const $interruptedMining = createStore<UserHistoryType[]>([]);
export const $miningOver = createStore(false);
export const $miningEquipments = createStore<MiningEquipments | null>(null);
export const $inLocation = createStore(false);
export const $hasInstalledEquipment = createStore(false);
export const $needFinishMineownerContract = createStore(false);
export const $equipmentIsBroken = createStore(false);
export const $landlordContractFinished = createStore(false);
export const $miningContractIsntActive = createStore(false);

export const $contractorCabin = combine(
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
    $landlordContract,
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
        miningContractIsntActive,
        landlordContract
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
        landlordContract,
    })
);

export const $isContractorCabinLoading = combine(
    getUserContractsEffect.pending,
    getUserHistoryEffect.pending,
    getUserInfoEffect.pending,
    getLandlordContractsEffect.pending,
    (...loadings) => loadings.some(Boolean)
);

export type ContractorCabinStore = ReturnType<
    typeof $contractorCabin['getState']
>;
