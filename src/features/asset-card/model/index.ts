import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { AssetDataType, getAtomicAssetsDataById } from 'entities/atomicassets';

export const AssetCardGate = createGate<string | number>('AssetCardGate');

export const getAssetCardEffect = createEffect(getAtomicAssetsDataById);

export const assetCardStore = createStore<AssetDataType | null>(null).on(
    getAssetCardEffect.doneData,
    (_, data) => data
);

forward({
    from: AssetCardGate.open,
    to: getAssetCardEffect,
});
