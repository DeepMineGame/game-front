import { createEffect, forward, createStore } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import { getAtomicAssetsByUser } from 'entities/atomicassets';
import { getInventoryConfig, UserInventoryType } from 'entities/smartcontract';

export const StarterPackNotifierGate = createGate<{
    searchParam: string;
}>('StarterPackNotifierGate');

export const getAtomicAssetsByUserEffect = createEffect(getAtomicAssetsByUser);

const getInventoryEffect = createEffect<
    { searchParam: string },
    { rows: UserInventoryType[] } | undefined
>(({ searchParam }) => getTableData(getInventoryConfig(searchParam)));

export const $hasInventoryItems = createStore<boolean>(false).on(
    getInventoryEffect.doneData,
    (_, data) => Boolean(data?.rows?.length)
);
export const $hasAtomicAssets = createStore(false).on(
    getAtomicAssetsByUserEffect.doneData,
    (state, payload) => Boolean(payload?.length)
);

forward({
    from: StarterPackNotifierGate.open,
    to: [getAtomicAssetsByUserEffect, getInventoryEffect],
});
