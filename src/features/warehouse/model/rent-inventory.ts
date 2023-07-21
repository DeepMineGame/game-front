import { createEffect, createStore, sample } from 'effector';
import { getRentAssetsTableData } from 'entities/smartcontract';
import { AssetDataType, getAssets } from 'entities/atomicassets';

export const getRentAssetsEffect = createEffect<
    { searchParam: string },
    { rows: { asset_id: string }[] } | undefined
>(getRentAssetsTableData);
export const $rentInventory = createStore<{ asset_id: string }[]>([]).on(
    getRentAssetsEffect.doneData,
    (data, payload) => payload?.rows
);
export const getInventoryAtomicAssetsEffect = createEffect<
    string[],
    AssetDataType[]
>(getAssets);

sample({
    source: $rentInventory,
    target: getInventoryAtomicAssetsEffect,
    filter: (inventory) => inventory.length > 0,
    fn: (assets) => assets?.map((asset) => String(asset.asset_id)),
});

export const $rentInventoryAtomicAssets = createStore<AssetDataType[]>([]).on(
    getInventoryAtomicAssetsEffect.doneData,
    (_, data) => data
);
