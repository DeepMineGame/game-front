import { createGate } from 'effector-react';
import { createEffect, createStore, forward, sample, combine } from 'effector';
import { getTableData } from 'shared';
import {
    AssetDataType,
    getAssets,
    getAtomicAssetsByUser,
} from 'entities/atomicassets';
import { getInventoryConfig, UserInventoryType } from 'entities/smartcontract';
import { mergeAssets } from 'shared/lib/utils';

export const WarehouseGate = createGate<{ searchParam: string }>(
    'warehouseGate'
);
export const getAtomicAssetsByUserEffect = createEffect(getAtomicAssetsByUser);

export const userAtomicAssetsStore = createStore<UserInventoryType[]>([]).on(
    getAtomicAssetsByUserEffect.doneData,
    (state, payload) => payload
);

const getAssetsEffect = createEffect(getAssets);

const $assets = createStore<AssetDataType[]>([]).on(
    getAssetsEffect.doneData,
    (_, data) => data
);

const getInventoryEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getTableData(getInventoryConfig(searchParam))
);

export const $userInventory = createStore([]).on(
    getInventoryEffect.doneData,
    (_, { rows }) => rows
);

export const $inventoriedUserAssets = combine(
    userAtomicAssetsStore,
    $assets,
    mergeAssets
);

sample({
    source: userAtomicAssetsStore,
    target: getAssetsEffect,
    fn: (notInventoriedAssets) =>
        notInventoriedAssets?.map((asset) => String(asset.asset_id)),
});

forward({
    from: WarehouseGate.open,
    to: [getAtomicAssetsByUserEffect, getInventoryEffect],
});
