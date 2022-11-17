import { createGate } from 'effector-react';
import { createEffect, createStore, forward, sample, combine } from 'effector';
import { getTableData } from 'shared';
import {
    AssetDataType,
    getAssets,
    getAtomicAssetsByUser,
} from 'entities/atomicassets';
import { getInventoryConfig, UserInventoryType } from 'entities/smartcontract';
import { mergeAssets, getGameAssets } from 'shared/lib/utils';

const WarehouseGate = createGate<{ searchParam: string }>('warehouseGate');

const getAtomicAssetsByUserEffect = createEffect(getAtomicAssetsByUser);

const getInventoryEffect = createEffect<
    { searchParam: string },
    { rows: UserInventoryType[] }
>(({ searchParam }) => getTableData(getInventoryConfig(searchParam)));

const $storage = createStore<UserInventoryType[]>([]).on(
    getAtomicAssetsByUserEffect.doneData,
    (_, payload) => payload
);

const $inventory = createStore<UserInventoryType[]>([]).on(
    getInventoryEffect.doneData,
    (_, { rows }) => rows
);

const getStorageAtomicAssetsEffect = createEffect<string[], AssetDataType[]>(
    getAssets
);
const getInventoryAtomicAssetsEffect = createEffect<string[], AssetDataType[]>(
    getAssets
);

const $storageAssetsIds = createStore<string[]>([]);
const $inventoryAssetsIds = createStore<string[]>([]);

const $storageAtomicAssets = createStore<AssetDataType[]>([]).on(
    getStorageAtomicAssetsEffect.doneData,
    (_, data) => data
);

const $inventoryAtomicAssets = createStore<AssetDataType[]>([]).on(
    getInventoryAtomicAssetsEffect.doneData,
    (_, data) => data
);

const $mergedInventoryWithAtomicAssets = combine(
    $inventory,
    $inventoryAtomicAssets,
    (...assets) => mergeAssets(...assets).filter(({ in_use }) => !in_use)
);

const $mergedStorageWithAtomicAssets = combine(
    $storage,
    $storageAtomicAssets,
    mergeAssets
);

sample({
    source: $inventory,
    target: $inventoryAssetsIds,
    fn: (assets) =>
        getGameAssets(assets)?.map((asset) => String(asset.asset_id)),
});

sample({
    source: $storage,
    target: $storageAssetsIds,
    fn: (assets) =>
        getGameAssets(assets)?.map((asset) => String(asset.asset_id)),
});

sample({
    source: $inventory,
    target: getInventoryAtomicAssetsEffect,
    fn: (assets) => assets?.map((asset) => String(asset.asset_id)),
});

sample({
    source: $storageAssetsIds,
    filter: (ids) => !!ids.length,
    target: getStorageAtomicAssetsEffect,
});

sample({
    source: $inventoryAssetsIds,
    filter: (ids) => !!ids.length,
    target: getInventoryAtomicAssetsEffect,
});

forward({
    from: WarehouseGate.open,
    to: [getAtomicAssetsByUserEffect, getInventoryEffect],
});

export {
    WarehouseGate,
    getAtomicAssetsByUserEffect,
    $storage,
    $mergedInventoryWithAtomicAssets,
    $mergedStorageWithAtomicAssets,
};
