import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { AssetStruct, getAssetsStatistic } from 'entities/game-stat';

export const getAssetEffect = createEffect(getAssetsStatistic);
export const asset$ = createStore<AssetStruct | null>(null).on(
    getAssetEffect.doneData,
    (_, data) => data
);

export const AssetGate = createGate<{ searchParam: string }>('AssetGate');
forward({
    from: AssetGate.open,
    to: getAssetEffect,
});
