import { attach, createApi, createStore, forward } from 'effector';
import { createGate } from 'effector-react';

import { userStore } from 'entities/user';
import { initialEffect } from './effects';
import { getContractEffectByExecutor } from './mineOwnerLandlordContractForUser';

export const MineOwnerCabinGate = createGate<{ searchParam: string }>(
    'MineOwnerCabinGate'
);

export enum mineOwnerCabinState {
    initial,
    needMineNft,
    needContractWithLandlord,
    needPhysicalShift,
    needSetupMine,
    needCrew,
    needActivateMine,
    everythingIsDone,
}

export const mineOwnerCabinStateStore = createStore<mineOwnerCabinState>(
    mineOwnerCabinState.initial
);

forward({
    from: MineOwnerCabinGate.open,
    to: initialEffect,
});

export const mineOwnerCabinStateResolver = createApi(mineOwnerCabinStateStore, {
    setNeedMineNftState: () => mineOwnerCabinState.needMineNft,
    setNeedContractWithLandlordState: () =>
        mineOwnerCabinState.needContractWithLandlord,
    needPhysicalShiftState: () => mineOwnerCabinState.needPhysicalShift,
    needSetupMineState: () => mineOwnerCabinState.needSetupMine,
    needCrewState: () => mineOwnerCabinState.needCrew,
    needActivateMineState: () => mineOwnerCabinState.needActivateMine,
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
