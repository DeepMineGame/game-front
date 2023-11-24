import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { AssetStruct, getAvailableRentAsset } from 'entities/game-stat';

export const getRentAssetsEffect = createEffect(getAvailableRentAsset);
export const $rentInventory = createStore<AssetStruct[]>([]).on(
    getRentAssetsEffect.doneData,
    (data, payload) => payload
);

export const rentInventoryGate = createGate<{ searchParam: string }>(
    'rentInventoryGate'
);

forward({
    from: rentInventoryGate.open,
    to: getRentAssetsEffect,
});
