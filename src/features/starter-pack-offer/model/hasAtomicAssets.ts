import { createEffect, forward, createStore } from 'effector';
import { createGate } from 'effector-react';
import { getAtomicAssetsByUser } from 'entities/atomicassets';

export const StarterPackNotifierGate = createGate<{
    searchParam: string;
}>('StarterPackNotifierGate');

export const getAtomicAssetsByUserEffect = createEffect(getAtomicAssetsByUser);

export const $hasAtomicAssets = createStore(false).on(
    getAtomicAssetsByUserEffect.doneData,
    (state, payload) => {
        console.log(payload);
        return Boolean(payload?.length);
    }
);

forward({
    from: StarterPackNotifierGate.open,
    to: getAtomicAssetsByUserEffect,
});
