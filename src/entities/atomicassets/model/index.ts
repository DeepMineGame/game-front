import { combine, createEffect, createStore, sample } from 'effector';
import { mergeAssets } from 'shared';
import { AssetDataType, getAssets } from 'entities/atomicassets';
import { inventoriesStore } from 'entities/smartcontract';

export const getAssetsEffect = createEffect(getAssets);

export const $assets = createStore<AssetDataType[]>([]).on(
    getAssetsEffect.doneData,
    (_, data) => data
);

// merge invetories with assets from atomic
export const $inventoriedAssets = combine(
    inventoriesStore,
    $assets,
    mergeAssets
);

export type InventoriedAssets = ReturnType<
    typeof $inventoriedAssets['getState']
>;

sample({
    source: inventoriesStore,
    target: getAssetsEffect,
    fn: (inventories) =>
        inventories?.map((inventory) => String(inventory.asset_id)),
});
