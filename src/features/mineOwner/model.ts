import { createEvent, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import compose from 'compose-function';
import {
    actionsStore,
    contractStore,
    getActionByUserEffect,
    getContractEffect,
    getInventoriesEffect,
    getMinesEffectByOwnerEffect,
    getSmartContractUserEffect,
    inventoriesStore,
    minesStore,
    smartContractUserStore,
} from 'entities/smartcontract';
import {
    avoidApplyIfAffectCurrentStatus,
    checkIfMineSetupWillFinishedInFuture,
    checkIsMineInActiveFilter,
    checkIsUserLocationOutsideMineFilter,
    findActiveMineContract,
    hasMineNftFilter,
    hasMinesFilter,
    isMineActiveFilter,
} from './filters';

export const MineOwnerCabinGate = createGate<{ searchParam: string }>(
    'MineOwnerCabinGate'
);

export enum mineOwnerCabinState {
    initial,
    hasNoMineNft,
    isOutsideFromLocation,
    needSignContractWithLandLord,
    isMineSetupInProgress,
    isMineSet,
    contractsFree,
    isMineActive,
}

const setHasNoMineNft = createEvent();
const setIsUserOutsideFromLocation = createEvent();
const setNeedSignContractWithLandLord = createEvent();
const setIsMineSetupInProgressEvent = createEvent();
const setIsMineSetEvent = createEvent();
const setContractsFreeEvent = createEvent();
const setMineActive = createEvent();

export const $mineOwnerCabinState = createStore<mineOwnerCabinState>(
    mineOwnerCabinState.initial
)
    .on(setHasNoMineNft, () => mineOwnerCabinState.hasNoMineNft)
    .on(
        setIsUserOutsideFromLocation,
        () => mineOwnerCabinState.isOutsideFromLocation
    )
    .on(
        setNeedSignContractWithLandLord,
        () => mineOwnerCabinState.needSignContractWithLandLord
    )
    .on(
        setIsMineSetupInProgressEvent,
        () => mineOwnerCabinState.isMineSetupInProgress
    )
    .on(setIsMineSetEvent, () => mineOwnerCabinState.isMineSet)
    .on(setContractsFreeEvent, () => mineOwnerCabinState.contractsFree)
    .on(setMineActive, () => mineOwnerCabinState.isMineActive);

// На открытие гейта заполняем нужные сторы
forward({
    from: MineOwnerCabinGate.open,
    to: [
        getInventoriesEffect,
        getSmartContractUserEffect,
        getMinesEffectByOwnerEffect,
        getActionByUserEffect,
        getContractEffect,
    ],
});

// Проверяем что есть NFT
sample({
    source: inventoriesStore,
    target: setHasNoMineNft,
    clock: inventoriesStore,
    filter: hasMineNftFilter,
});

// Проверяем что пользователь за пределами локации
sample({
    source: smartContractUserStore,
    target: setIsUserOutsideFromLocation,
    clock: [setHasNoMineNft, getSmartContractUserEffect],
    filter: checkIsUserLocationOutsideMineFilter,
});

// Проверяем что заключен контракт с владельцем земли
sample({
    source: minesStore,
    target: setNeedSignContractWithLandLord,
    clock: [setIsUserOutsideFromLocation, setHasNoMineNft],
    filter: compose(
        avoidApplyIfAffectCurrentStatus(
            $mineOwnerCabinState,
            mineOwnerCabinState.needSignContractWithLandLord
        ),
        checkIsMineInActiveFilter
    ),
});

// Проверяем что установка шахты в in progress
sample({
    source: actionsStore,
    target: setIsMineSetupInProgressEvent,
    clock: [
        setIsUserOutsideFromLocation,
        setHasNoMineNft,
        setNeedSignContractWithLandLord,
    ],
    filter: checkIfMineSetupWillFinishedInFuture,
});

// Проверяем что шахта установлена
sample({
    source: minesStore,
    target: setIsMineSetEvent,
    clock: [
        getMinesEffectByOwnerEffect,
        setIsUserOutsideFromLocation,
        setHasNoMineNft,
        setNeedSignContractWithLandLord,
    ],
    filter: compose(
        avoidApplyIfAffectCurrentStatus(
            $mineOwnerCabinState,
            mineOwnerCabinState.isMineSet
        ),
        hasMinesFilter
    ),
});

// Проверяем что заключен хоть один контракт (contractsFree)
sample({
    source: { contract: contractStore, inventory: inventoriesStore },
    target: setContractsFreeEvent,
    clock: [
        getMinesEffectByOwnerEffect,
        setIsUserOutsideFromLocation,
        setHasNoMineNft,
        setNeedSignContractWithLandLord,
    ],
    filter: compose(
        avoidApplyIfAffectCurrentStatus(
            $mineOwnerCabinState,
            mineOwnerCabinState.contractsFree
        ),
        findActiveMineContract
    ),
});

// Проверяем что шахта активна
sample({
    source: minesStore,
    target: setMineActive,
    clock: [
        getMinesEffectByOwnerEffect,
        setIsMineSetEvent,
        setIsUserOutsideFromLocation,
        setHasNoMineNft,
        setNeedSignContractWithLandLord,
        setContractsFreeEvent,
    ],
    filter: isMineActiveFilter,
});
