import { combine, createEffect, createStore, sample } from 'effector';
import { AssetDataType, getAssets } from 'entities/atomicassets';
import { $inventory } from 'entities/smartcontract';
import { mergeAssets, getGameAssets } from 'shared/lib/utils';

export const getAtomicAssetsEffect = createEffect<string[], AssetDataType[]>(
    getAssets
);

export const $inventoryAtomicAssets = createStore<AssetDataType[]>([]).on(
    getAtomicAssetsEffect.doneData,
    (_, data) => data
);

const $inventoryAssetsIds = createStore<string[]>([]);

// merge assets from inventory with assets from atomic
export const $mergedInventoryWithAtomicAssets = combine(
    $inventory,
    $inventoryAtomicAssets,
    mergeAssets
);

export type MergedInventoryWithAtomicAssets = ReturnType<
    typeof $mergedInventoryWithAtomicAssets['getState']
>;

sample({
    source: $inventory,
    target: $inventoryAssetsIds,
    fn: (assets) =>
        getGameAssets(assets)?.map((asset) => String(asset.asset_id)),
});

sample({
    source: $inventoryAssetsIds,
    filter: (ids) => !!ids.length,
    target: getAtomicAssetsEffect,
});
