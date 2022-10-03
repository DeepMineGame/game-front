import { combine, createEffect, createStore, sample } from 'effector';
import { AssetDataType, getAssets } from 'entities/atomicassets';
import { inventoriesStore } from 'entities/smartcontract';

export const getAssetsEffect = createEffect(getAssets);

export const $assets = createStore<AssetDataType[]>([]).on(
    getAssetsEffect.doneData,
    (_, data) => data
);

// merge invetories with assets
export const $inventoriedAssets = combine(
    inventoriesStore,
    $assets,
    (inventories, assets) =>
        assets.map((asset) => ({
            ...asset,
            ...inventories?.find(
                (inventory) => asset.asset_id === inventory.asset_id
            ),
        }))
);

export type InventoriedAssets = ReturnType<
    typeof $inventoriedAssets['getState']
>;

sample({
    source: inventoriesStore,
    target: getAssetsEffect,
    fn: (inventories) => inventories?.map((inventory) => inventory.asset_id),
});
