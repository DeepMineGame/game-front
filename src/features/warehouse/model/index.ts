import { createGate } from 'effector-react';
import { createEffect, createStore, forward, sample, combine } from 'effector';
import { getTableData } from 'shared';
import {
    AssetDataType,
    getAssets,
    getAtomicAssetsByUser,
} from 'entities/atomicassets';
import {
    getInventoryConfig,
    InventoryType,
    UserInventoryType,
} from 'entities/smartcontract';
import { mergeAssets, getGameAssets } from 'shared/lib/utils';
import { getRentAssetsEffect } from './rent-inventory';
import { getInventoryAtomicAssetsEffect } from './effects';

const WarehouseGate = createGate<{ searchParam: string }>('warehouseGate');

const getAtomicAssetsByUserEffect = createEffect(getAtomicAssetsByUser);

const getInventoryEffect = createEffect<
    { searchParam: string },
    { rows: UserInventoryType[] } | undefined
>(({ searchParam }) => getTableData(getInventoryConfig(searchParam)));

const $storage = createStore<UserInventoryType[]>([]).on(
    getAtomicAssetsByUserEffect.doneData,
    (_, payload) => payload
);

const $inventory = createStore<UserInventoryType[]>([]).on(
    getInventoryEffect.doneData,
    (_, data) => data?.rows
);

const getStorageAtomicAssetsEffect = createEffect<string[], AssetDataType[]>(
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

const parseAtomicAssetType = ({
    schema: { schema_name },
}: AssetDataType): InventoryType => {
    switch (schema_name) {
        case 'areas':
            return InventoryType.areas;
        case 'equipment':
            return InventoryType.equipment;
        case 'structures':
            return InventoryType.structures;
        case 'badges':
            return InventoryType.badges;
        case 'schemas':
            return InventoryType.schemas;
        case 'modules':
            return InventoryType.modules;
        case 'packs':
            return InventoryType.packs;
        case 'stickers':
            return InventoryType.stickers;
        case 'cards':
            return InventoryType.cards;
        default:
            return InventoryType.undefined;
    }
};

const $mergedStorageWithAtomicAssets = combine(
    $storage,
    $storageAtomicAssets,
    (...assets) =>
        mergeAssets(...assets).map((asset) => ({
            ...asset,
            inv_type: parseAtomicAssetType(asset),
        }))
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
    filter: (inventory) => inventory.length > 0,
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

export {
    WarehouseGate,
    getAtomicAssetsByUserEffect,
    $storage,
    $mergedInventoryWithAtomicAssets,
    $mergedStorageWithAtomicAssets,
};

forward({
    from: WarehouseGate.open,
    to: [getAtomicAssetsByUserEffect, getInventoryEffect, getRentAssetsEffect],
});
