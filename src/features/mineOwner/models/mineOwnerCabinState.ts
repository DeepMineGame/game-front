import { attach, createApi, createStore, forward } from 'effector';
import { createGate } from 'effector-react';

import { userStore } from 'entities/user';
import { initialMineNfrCheckEffect } from './effects';
import { getContractEffectByExecutor } from './mineOwnerLandlordContractForUser';

export const MineOwnerCabinGate = createGate<{ searchParam: string }>(
    'MineOwnerCabinGate'
);

export enum mineOwnerCabinState {
    initial,
    needMineNft,
    needContractWithLandlord,
    contractWithLandlordWasTerminated,
    needPhysicalShift,
    needSetupMine,
    mineIsDepthChanging,
    needCrew,
    needActivateMine,
    everythingIsDone,
}

export const $mineOwnerCabinState = createStore<mineOwnerCabinState>(
    mineOwnerCabinState.initial
);

forward({
    from: MineOwnerCabinGate.open,
    to: initialMineNfrCheckEffect,
});

export const mineOwnerCabinStateResolver = createApi($mineOwnerCabinState, {
    setNeedMineNftState: () => mineOwnerCabinState.needMineNft,
    setNeedContractWithLandlordState: () =>
        mineOwnerCabinState.needContractWithLandlord,
    setContractWithLandlordWasTerminated: () =>
        mineOwnerCabinState.contractWithLandlordWasTerminated,
    needPhysicalShiftState: () => mineOwnerCabinState.needPhysicalShift,
    mineIsDepthChangingState: () => mineOwnerCabinState.mineIsDepthChanging,
    needSetupMineState: () => mineOwnerCabinState.needSetupMine,
    needActivateMineState: () => mineOwnerCabinState.needActivateMine,
    needCrewState: () => mineOwnerCabinState.needCrew,
    everythingIsDoneState: () => mineOwnerCabinState.everythingIsDone,
});

// to set up the mine we need pass contract id
// this forward enrich the store with contract that uses in that component
forward({
    from: mineOwnerCabinStateResolver.needSetupMineState,
    to: attach({
        effect: getContractEffectByExecutor,
        source: userStore,
        mapParams: (_, user) => {
            return { searchParam: user?.wax_address! };
        },
    }),
});
