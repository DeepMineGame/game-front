import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getMineStats, MineStatUnit, Roles } from 'entities/game-stat';

const getMineOwnerStatEffect = createEffect(getMineStats);

export const $mineStats = createStore<MineStatUnit[]>([]).on(
    getMineOwnerStatEffect.doneData,
    (_, data) => data
);

export const MineStatsGate = createGate<{
    searchParam: string;
    role: Roles;
}>('MineStatsGate');

forward({
    from: MineStatsGate.open,
    to: getMineOwnerStatEffect,
});
