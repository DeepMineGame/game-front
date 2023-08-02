import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getMiningStat, MineStat } from 'entities/game-stat';

const getMiningEffect = createEffect(getMiningStat);

export const $mineStat = createStore<MineStat | null>(null).on(
    getMiningEffect.doneData,
    (_, payload) => payload
);

export const MineStatGate = createGate<{ accountName: string }>('MineStatGate');

forward({
    from: MineStatGate.open,
    to: getMiningEffect,
});
