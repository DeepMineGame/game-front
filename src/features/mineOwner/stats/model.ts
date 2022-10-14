import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getMineOwnerStats, MineStatUnit, Role } from 'entities/gameStat';

const getMineOwnerStatEffect = createEffect(getMineOwnerStats);

export const $mineOwnerStats = createStore<MineStatUnit[]>([]).on(
    getMineOwnerStatEffect.doneData,
    (_, data) => data
);

export const MineOwnerStatsGate = createGate<{
    searchParam: string;
    role: Role;
}>('MineOwnerStatsGate');

forward({
    from: MineOwnerStatsGate.open,
    to: getMineOwnerStatEffect,
});
