import { createEvent, createStore, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import compose from 'compose-function';
import {
    actionsStore,
    contractStore,
    getActionByUserEffect,
    getContractEffect,
    getInventoriesEffect,
    getMinesByOwnerEffect,
    getSmartContractUserEffect,
    inventoriesStore,
    minesStore,
    smartContractUserStore,
} from 'entities/smartcontract';
import {
    checkIfMineSetupWillFinishedInFuture,
    checkHasActiveContractWithLandlord,
    checkIsUserLocationOutsideMineFilter,
    hasActiveMineContractFilter,
    hasMineNftFilter,
    hasMinesFilter,
    ignoreIfInStatus,
    isMineActiveFilter,
} from '../filters';

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

export const setInitialStateEvent = createEvent();
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
    .on(setInitialStateEvent, () => mineOwnerCabinState.initial)
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
        getMinesByOwnerEffect,
        getActionByUserEffect,
        getContractEffect,
    ],
});

// Checks that user has the mine NFT
guard({
    source: inventoriesStore,
    target: setHasNoMineNft,
    clock: [inventoriesStore, setInitialStateEvent],
    filter: hasMineNftFilter,
});

// Checks that the user is outside the mine location
sample({
    source: smartContractUserStore,
    target: setIsUserOutsideFromLocation,
    clock: [getSmartContractUserEffect.doneData, setInitialStateEvent],
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.hasNoMineNft,
        ]),
        checkIsUserLocationOutsideMineFilter
    ),
});

// Checks that a contract has been signed with the landlord
sample({
    source: contractStore,
    target: setNeedSignContractWithLandLord,
    clock: [setInitialStateEvent, contractStore],
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.hasNoMineNft,
            mineOwnerCabinState.isOutsideFromLocation,
        ]),
        checkHasActiveContractWithLandlord
    ),
});

// Checks that the mine setup in prgoress
sample({
    source: actionsStore,
    target: setIsMineSetupInProgressEvent,
    clock: [
        setIsUserOutsideFromLocation,
        setHasNoMineNft,
        setNeedSignContractWithLandLord,
        setInitialStateEvent,
        actionsStore,
    ],
    filter: checkIfMineSetupWillFinishedInFuture,
});

// Check that has mine contract (contractsFree)
sample({
    source: { contract: contractStore, inventory: inventoriesStore },
    target: setContractsFreeEvent,
    clock: [setInitialStateEvent, contractStore, inventoriesStore],
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.hasNoMineNft,
            mineOwnerCabinState.isMineSet,
            mineOwnerCabinState.isOutsideFromLocation,
            mineOwnerCabinState.isMineSetupInProgress,
            mineOwnerCabinState.needSignContractWithLandLord,
        ]),
        hasActiveMineContractFilter
    ),
});

// Check that mine setup finished
sample({
    source: minesStore,
    target: setIsMineSetEvent,
    clock: [setInitialStateEvent, minesStore, getMinesByOwnerEffect],
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.hasNoMineNft,
            mineOwnerCabinState.isOutsideFromLocation,
            mineOwnerCabinState.isMineSetupInProgress,
        ]),
        hasMinesFilter
    ),
});

// Check that mine is active
sample({
    source: minesStore,
    target: setMineActive,
    clock: [
        getMinesByOwnerEffect,
        setIsMineSetEvent,
        setIsUserOutsideFromLocation,
        setHasNoMineNft,
        setNeedSignContractWithLandLord,
        setContractsFreeEvent,
        setInitialStateEvent,
    ],
    filter: isMineActiveFilter,
});
