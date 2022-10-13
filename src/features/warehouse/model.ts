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
const getInvetoryAssetsEffect = createEffect(getAssets);

const $assets = createStore<AssetDataType[]>([]).on(
    getAssetsEffect.doneData,
    (_, data) => data
);

const $invetoryAssets = createStore<AssetDataType[]>([]).on(
    getInvetoryAssetsEffect.doneData,
    (_, data) => data
);

const getInventoryEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getTableData(getInventoryConfig(searchParam))
);

const $userInventory = createStore<UserInventoryType[]>([]).on(
    getInventoryEffect.doneData,
    (_, { rows }) => rows
);

export const $inventoriedUserInventory = combine(
    $userInventory,
    $invetoryAssets,
    (...assets) => mergeAssets(...assets).filter(({ in_use }) => !in_use)
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

sample({
    source: $userInventory,
    target: getInvetoryAssetsEffect,
    fn: (notInventoriedAssets) =>
        notInventoriedAssets?.map((asset) => String(asset.asset_id)),
});

forward({
    from: WarehouseGate.open,
    to: [getAtomicAssetsByUserEffect, getInventoryEffect],
});
