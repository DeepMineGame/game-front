import { createEvent, createStore, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import compose from 'compose-function';
import {
    actionsStore,
    getActionByUserEffect,
    getInventoriesEffect,
    getSmartContractUserEffect,
    inventoriesStore,
    smartContractUserStore,
} from 'entities/smartcontract';
import {
    checkIfMineSetupWillFinishedInFuture,
    checkIsContractInactive,
    checkIsUserLocationOutsideMineFilter,
    hasActiveMineContractFilter,
    hasMineNftFilter,
    hasMinesFilter,
    ignoreIfInStatus,
    isMineActiveFilter,
    checkMineNotSetup,
} from '../filters';
import { getMinesByOwnerEffect, userMineStore } from './currentMine';
import {
    getContractEffectByExecutor,
    mineOwnerLandlordContractForUserStore,
} from './mineOwnerLandlordContractForUser';

export const MineOwnerCabinGate = createGate<{ searchParam: string }>(
    'MineOwnerCabinGate'
);

export enum mineOwnerCabinState {
    initial,
    hasNoMineNft,
    isOutsideFromLocation,
    needSignContractWithLandLord,
    needSetupMine,
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
const needSetupMineEvent = createEvent();

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
    .on(needSetupMineEvent, () => mineOwnerCabinState.needSetupMine)
    .on(
        setIsMineSetupInProgressEvent,
        () => mineOwnerCabinState.isMineSetupInProgress
    )
    .on(setIsMineSetEvent, () => mineOwnerCabinState.isMineSet)
    .on(setContractsFreeEvent, () => mineOwnerCabinState.contractsFree)
    .on(setMineActive, () => mineOwnerCabinState.isMineActive);

forward({
    from: MineOwnerCabinGate.open,
    to: [
        getInventoriesEffect,
        getSmartContractUserEffect,
        getMinesByOwnerEffect,
        getActionByUserEffect,
        getContractEffectByExecutor,
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

// Check that has mine contract (contractsFree)
sample({
    source: {
        contract: mineOwnerLandlordContractForUserStore,
        inventory: inventoriesStore,
    },
    target: setContractsFreeEvent,
    clock: [
        setInitialStateEvent,
        mineOwnerLandlordContractForUserStore,
        inventoriesStore,
    ],
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

// Checks that a contract has been signed with the landlord
sample({
    source: mineOwnerLandlordContractForUserStore,
    target: setNeedSignContractWithLandLord,
    clock: [
        setInitialStateEvent,
        mineOwnerLandlordContractForUserStore,
        getContractEffectByExecutor,
    ],
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.hasNoMineNft,
            mineOwnerCabinState.isOutsideFromLocation,
        ]),
        checkIsContractInactive
    ),
});

// Checks that mine not setup
sample({
    source: { mineOwnerLandlordContractForUserStore, userMineStore },
    target: needSetupMineEvent,
    clock: [
        setInitialStateEvent,
        mineOwnerLandlordContractForUserStore,
        userMineStore,
    ],
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.hasNoMineNft,
            mineOwnerCabinState.isOutsideFromLocation,
            mineOwnerCabinState.needSignContractWithLandLord,
            mineOwnerCabinState.isMineSet,
            mineOwnerCabinState.isMineActive,
        ]),
        checkMineNotSetup
    ),
});

// Checks that the mine setup in progress
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

// Check that mine setup finished
sample({
    source: userMineStore,
    target: setIsMineSetEvent,
    clock: [setInitialStateEvent, userMineStore, getMinesByOwnerEffect],
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.hasNoMineNft,
            mineOwnerCabinState.isOutsideFromLocation,
            mineOwnerCabinState.isMineSetupInProgress,
            mineOwnerCabinState.needSignContractWithLandLord,
            mineOwnerCabinState.needSetupMine,
        ]),
        hasMinesFilter
    ),
});
// Check that mine is active
sample({
    source: userMineStore,
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
    filter: compose(
        ignoreIfInStatus($mineOwnerCabinState, [
            mineOwnerCabinState.needSignContractWithLandLord,
        ]),
        isMineActiveFilter
    ),
});
