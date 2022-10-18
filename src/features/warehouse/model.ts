import { createGate } from 'effector-react';
import {
    createEffect,
    createStore,
    forward,
    sample,
    combine,
    guard,
} from 'effector';
import { getTableData } from 'shared';
import {
    AssetDataType,
    getAssets,
    getAtomicAssetsByUser,
} from 'entities/atomicassets';
import { getInventoryConfig, UserInventoryType } from 'entities/smartcontract';
import { mergeAssets, getGameAssets } from 'shared/lib/utils';

export const WarehouseGate = createGate<{ searchParam: string }>(
    'warehouseGate'
);
export const getAtomicAssetsByUserEffect = createEffect(getAtomicAssetsByUser);

export const userAtomicAssetsStore = createStore<UserInventoryType[]>([]).on(
    getAtomicAssetsByUserEffect.doneData,
    (state, payload) => payload
);

const getAssetsEffect = createEffect(getAssets);

const $inventoryAssetIds = createStore<string[]>([]);

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

// merge inventories with assets from atomic
export const $inventoriedUserAssets = combine(
    userAtomicAssetsStore,
    $assets,
    mergeAssets
);

sample({
    source: userAtomicAssetsStore,
    target: $inventoryAssetIds,
    fn: (inventories) =>
        getGameAssets(inventories)?.map((inventory) =>
            String(inventory.asset_id)
        ),
});

forward({
    from: WarehouseGate.open,
    to: [getAtomicAssetsByUserEffect, getInventoryEffect],
});

guard({
    source: $inventoryAssetIds,
    filter: (inventories) => !!inventories.length,
    target: getAssetsEffect,
});
