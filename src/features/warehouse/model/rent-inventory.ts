import { combine, createEffect, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
    getRentAssetsTableData,
    RentAssetTableSearchType,
} from 'entities/smartcontract';
import { AssetDataType, getAssets } from 'entities/atomicassets';
import { mergeAssets } from 'shared/lib/utils';

export const RentInventoryGate = createGate<{
    searchParam?: string | undefined;
    searchType?: RentAssetTableSearchType;
}>('RentInventoryGate');
export const getRentAssetsEffect = createEffect<
    { searchParam?: string | undefined; searchType?: RentAssetTableSearchType },
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

export const $mergedRentWithAtomicAssets = combine(
    $rentInventory,
    $rentInventoryAtomicAssets,
    (rentInventory, atomicAsset) =>
        rentInventory &&
        atomicAsset && {
            ...mergeAssets(rentInventory, atomicAsset)[0],
            inRentStorage: true,
        }
);

forward({ from: RentInventoryGate.open, to: getRentAssetsEffect });
