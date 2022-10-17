import { combine, createEffect, createStore, sample } from 'effector';
import compose from 'compose-function';
import { AssetDataType, getAssets } from 'entities/atomicassets';
import { inventoriesStore, UserInventoryType } from 'entities/smartcontract';
import { mergeAssets, pickGameAssets } from 'shared/lib/utils';

export const getAssetsEffect = createEffect(getAssets);

export const $assets = createStore<AssetDataType[]>([]).on(
    getAssetsEffect.doneData,
    (_, data) => data
);

// merge invetories with assets from atomic & pick game assets
export const $inventoriedAssets = combine<
    UserInventoryType[],
    AssetDataType[],
    (UserInventoryType & AssetDataType)[]
>(inventoriesStore, $assets, compose(pickGameAssets, mergeAssets));

export type InventoriedAssets = ReturnType<
    typeof $inventoriedAssets['getState']
>;

sample({
    source: inventoriesStore,
    target: getAssetsEffect,
    fn: (inventories) =>
        inventories?.map((inventory) => String(inventory.asset_id)),
});
