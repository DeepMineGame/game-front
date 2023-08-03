import { createEffect, createStore, forward, createEvent } from 'effector';
import { createGate } from 'effector-react';
import { getMiningStat, MineStat } from 'entities/game-stat';

export const getMiningEffect = createEffect(getMiningStat);

export const $miningStat = createStore<MineStat | null>(null).on(
    getMiningEffect.doneData,
    (_, payload) => payload
);
export const MiningStatGate = createGate<{ accountName: string }>(
    'MineStatGate'
);

forward({
    from: MiningStatGate.open,
    to: getMiningEffect,
});
