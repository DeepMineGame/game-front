import { createEvent, createStore, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import {
    actionsStore,
    getActionByUserEffect,
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
    hasMineNftFilter,
} from './filters';

export const MineOwnerCabinGate = createGate<{ searchParam: string }>(
    'MineOwnerCabinGate'
);

export enum mineOwnerCabinState {
    initial,
    isOutsideFromLocation,
    needSignContractWithLandLord,
    isMining,
    hasMineNft,
    isMineSetupInProgress,
    isMineSet,
    isMineActive,
}

const setHasMineNft = createEvent();
const setIsUserOutsideFromLocation = createEvent();
const setNeedSignContractWithLandLord = createEvent();
const setIsMineSetupInProgressEvent = createEvent();
const setIsMineSetEvent = createEvent();

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
    .on(setIsMineSetEvent, () => mineOwnerCabinState.isMineSet);

// На открытие гейта заполняем нужные сторы
forward({
    from: MineOwnerCabinGate.open,
    to: [
        getInventoriesEffect,
        getSmartContractUserEffect,
        getMinesEffectByOwnerEffect,
        getActionByUserEffect,
    ],
});

// Проверяем что есть NFT
guard({
    source: inventoriesStore,
    target: setHasMineNft,
    clock: inventoriesStore,
    filter: hasMineNftFilter,
});

// Проверяем что пользователь за пределами локации
guard({
    source: smartContractUserStore,
    target: setIsUserOutsideFromLocation,
    clock: setHasMineNft,
    filter: checkIsUserLocationOutsideMineFilter,
});

// Проверяем что заключен контракт с владельцем земли (landLord)
guard({
    source: minesStore,
    target: setNeedSignContractWithLandLord,
    clock: [setIsUserOutsideFromLocation, setHasMineNft],
    filter: checkIsMineInActiveFilter,
});

// Проверяем что установка шахты в in progress
guard({
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
guard({
    source: minesStore,
    target: setIsMineSetEvent,
    clock: [
        getMinesEffectByOwnerEffect,
        setIsUserOutsideFromLocation,
        setHasMineNft,
        setNeedSignContractWithLandLord,
    ],
    filter: (mines) => Boolean(mines?.[0].is_active),
});
