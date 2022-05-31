import { createEvent, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
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
    isOutsideFromLocation,
    needSignContractWithLandLord,
    hasMineNft,
    isMineSetupInProgress,
    isMineSet,
    contractsFree,
    isMineActive,
}

const setHasMineNft = createEvent();
const setIsUserOutsideFromLocation = createEvent();
const setNeedSignContractWithLandLord = createEvent();
const setIsMineSetupInProgressEvent = createEvent();
const setIsMineSetEvent = createEvent();
const setContractsFreeEvent = createEvent();
const setMineActive = createEvent();

export const $mineOwnerCabinState = createStore<mineOwnerCabinState>(
    mineOwnerCabinState.initial
)
    .on(setHasMineNft, () => mineOwnerCabinState.hasMineNft)
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
    target: setHasMineNft,
    clock: inventoriesStore,
    filter: hasMineNftFilter,
});

// Проверяем что пользователь за пределами локации
sample({
    source: smartContractUserStore,
    target: setIsUserOutsideFromLocation,
    clock: [setHasMineNft, getSmartContractUserEffect],
    filter: checkIsUserLocationOutsideMineFilter,
});

// Проверяем что заключен контракт с владельцем земли (landLord)
sample({
    source: minesStore,
    target: setNeedSignContractWithLandLord,
    clock: [setIsUserOutsideFromLocation, setHasMineNft],
    filter: checkIsMineInActiveFilter,
});

// Проверяем что установка шахты в in progress
sample({
    source: actionsStore,
    target: setIsMineSetupInProgressEvent,
    clock: [
        setIsUserOutsideFromLocation,
        setHasMineNft,
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
        setHasMineNft,
        setNeedSignContractWithLandLord,
    ],
    filter: hasMinesFilter,
});

// Проверяем что заключен хоть один контракт
sample({
    source: { contract: contractStore, inventory: inventoriesStore },
    target: setContractsFreeEvent,
    clock: [
        getMinesEffectByOwnerEffect,
        setIsUserOutsideFromLocation,
        setHasMineNft,
        setNeedSignContractWithLandLord,
    ],
    filter: findActiveMineContract,
});

// Проверяем что шахта активна
sample({
    source: minesStore,
    target: setMineActive,
    clock: [
        getMinesEffectByOwnerEffect,
        setIsMineSetEvent,
        setIsUserOutsideFromLocation,
        setHasMineNft,
        setNeedSignContractWithLandLord,
        setContractsFreeEvent,
    ],
    filter: isMineActiveFilter,
});
