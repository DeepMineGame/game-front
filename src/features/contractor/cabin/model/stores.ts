import { combine, createStore } from 'effector';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    getMalfunctionProbabilitiesTable,
    GetMalfunctionProbabilitiesTableParams,
    MineState,
    UserHistoryType,
    UserInfoType,
    UserInventoryType,
} from 'entities/smartcontract';
import { $currentMine } from '../../../mining';
import { LastMiningStatus } from '../constants';
import {
    getLandlordContractsEffect,
    getLastMiningStatusEffect,
    getUserContractsEffect,
    getUserHistoryEffect,
    getUserInfoEffect,
} from './effects';

type MiningEquipments = Record<string, UserInventoryType | undefined>;

const $userContracts = createStore<ContractDto[]>([]).on(
    getUserContractsEffect.doneData,
    (_, data) => data?.rows
);

export const $landlordContract = createStore<ContractDto | null>(null).on(
    getLandlordContractsEffect.doneData,
    (_, data) =>
        data?.rows?.find(
            ({ type, status }) =>
                type === ContractType.landlord_mineowner &&
                status === ContractStatus.active
        ) || null
);

export const $userInfo = createStore<UserInfoType | null>(null).on(
    getUserInfoEffect.doneData,
    (_, data) => data?.rows?.[0]
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
    (_, data) => data?.rows
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
export const $isMineDepthChanging = combine(
    $currentMine,
    (currentMine) => currentMine?.[0]?.state === MineState.depth_changing
);
export const $generalEquipmentBreakageProbabillity =
    $installedMiningEquipments.map((installedMiningEquipments) => {
        // to find generalProbabilityOfNoBreakage, multiply each equipmentProbabilityOfNoBreakage
        // example: equipmentProbabilityOfNoBreakage =
        // = (1 - malfunctionProbabilitiyEquip1) * (1 - malfunctionProbabilitiyEquip2) *
        // * ... * (1 - malfunctionProbabilitiyEquip5)
        const generalProbabilityOfNoBreakage = installedMiningEquipments.reduce(
            (acc, equipment) => {
                // to find equipmentProbabilityOfNoBreakage,
                // get malfunctionProbabilitiy from table and do 1 - malfunctionProbabilitiy
                const equipmentProbabilityOfNoBreakage =
                    1 -
                    (getMalfunctionProbabilitiesTable(
                        equipment.data
                            .name as GetMalfunctionProbabilitiesTableParams
                    )?.[equipment.data.rarity][
                        Number(equipment.data['current capacity']) -
                            Number(equipment.data.depreciation)
                    ] || 0);

                return acc * equipmentProbabilityOfNoBreakage;
            },
            1
        );

        // to find generalEquipmentBreakageProbabillity, do 1 - generalProbabilityOfNoBreakage
        return 1 - generalProbabilityOfNoBreakage;
    });

export const $contractorCabin = combine(
    {
        hasMineOwnerContracts: $hasMineOwnerContracts,
        installedMiningEquipments: $installedMiningEquipments,
        isNotFullEquipmentsSet: $isNotFullEquipmentsSet,
        activeMining: $activeMining,
        interruptedMining: $interruptedMining,
        miningOver: $miningOver,
        needFinishMineownerContract: $needFinishMineownerContract,
        equipmentIsBroken: $equipmentIsBroken,
        landlordContractFinished: $landlordContractFinished,
        miningContractIsntActive: $miningContractIsntActive,
        landlordContract: $landlordContract,
        isMineDepthChanging: $isMineDepthChanging,
    },
    ({
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
        isMineDepthChanging,
    }) => ({
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
        isMineDepthChanging,
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

export const $lastMiningStatus = createStore<LastMiningStatus | null>(null).on(
    getLastMiningStatusEffect.doneData,
    (_, { status }) => status
);
