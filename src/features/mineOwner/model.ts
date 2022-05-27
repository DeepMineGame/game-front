import { createEvent, createStore, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import {
    getInventoriesEffect,
    getMinesEffect,
    getSmartContractUserEffect,
    inventoriesStore,
    minesStore,
    smartContractUserStore,
} from 'entities/smartcontract';
import {
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
    isMineSet,
    isMineSetupInProgress,
    isMineActive,
}

const setHasMineNft = createEvent();
const setIsUserOutsideFromLocation = createEvent();
const setNeedSignContractWithLandLord = createEvent();

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
    );

// На открытие гейта заполняем нужные сторы
forward({
    from: MineOwnerCabinGate.open,
    to: [getInventoriesEffect, getSmartContractUserEffect, getMinesEffect],
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

// Проверяем что заключен контракт с владельцем земли
guard({
    source: minesStore,
    target: setNeedSignContractWithLandLord,
    clock: [setIsUserOutsideFromLocation, setHasMineNft],
    filter: checkIsMineInActiveFilter,
});
