import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';

import { getUniqueItems } from 'shared';
import {
    AssetStruct,
    getStorageAssets,
    getInventoryAssets,
} from 'entities/game-stat';
import { getRentAssetsEffect } from './rent-inventory';

const WarehouseGate = createGate<{ searchParam: string }>('warehouseGate');

const getUserStorageAssets = createEffect(getStorageAssets);

const getInventoryEffect = createEffect(getInventoryAssets);

const $storage = createStore<AssetStruct[]>([]).on(
    getUserStorageAssets.doneData,
    (state, payload) =>
        getUniqueItems([...state, ...payload], ({ asset_id }) =>
            String(asset_id)
        )
);

export const $inventoryAssets = createStore<AssetStruct[]>([]).on(
    getInventoryEffect.doneData,
    (_, data) => data
);

export { WarehouseGate, getUserStorageAssets, $storage };

forward({
    from: WarehouseGate.open,
    to: [getUserStorageAssets, getInventoryEffect, getRentAssetsEffect],
});
export * from './rent-inventory';
