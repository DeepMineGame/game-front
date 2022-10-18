import { combine, createEffect, createStore, guard, sample } from 'effector';
import { AssetDataType, getAssets } from 'entities/atomicassets';
import { inventoriesStore } from 'entities/smartcontract';
import { mergeAssets, getGameAssets } from 'shared/lib/utils';

export const getAssetsEffect = createEffect(getAssets);

export const $assets = createStore<AssetDataType[]>([]).on(
    getAssetsEffect.doneData,
    (_, data) => data
);

const $inventoryAssetIds = createStore<string[]>([]);

// merge inventories with assets from atomic
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
    target: $inventoryAssetIds,
    fn: (inventories) =>
        getGameAssets(inventories)?.map((inventory) =>
            String(inventory.asset_id)
        ),
});

guard({
    source: $inventoryAssetIds,
    filter: (inventories) => !!inventories.length,
    target: getAssetsEffect,
});
