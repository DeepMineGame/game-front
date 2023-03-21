import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';

import { getMinesOnLand, MinesOnLand } from 'entities/game-stat';

export const LandGate = createGate<{ searchParam: number }>('LandGate');
export const getMinesOnLandEffect = createEffect(
    async ({ searchParam }: { searchParam: number }) => {
        return getMinesOnLand({
            id: searchParam,
        });
    }
);

export const $minesOnLand = createStore<MinesOnLand>([]).on(
    getMinesOnLandEffect.doneData,
    (_, data) => data
);

forward({
    from: LandGate.open,
    to: getMinesOnLandEffect,
});
