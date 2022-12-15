import { createEvent, createStore, combine } from 'effector';
import { createGate } from 'effector-react';
import { AssetDataType } from 'entities/atomicassets';
import { InventoryType, UserInventoryType } from 'entities/smartcontract';
import {
    $mergedInventoryWithAtomicAssets,
    $mergedStorageWithAtomicAssets,
} from '.';

const DraggableAssetsGate = createGate<{
    assets: Set<AssetDataType & UserInventoryType>;
}>();

const changeType = createEvent<InventoryType>();
const changeActiveInventoryAssetName = createEvent<string | null>();
const changeStorageAssetName = createEvent<string | null>();

const $draggableAssets = DraggableAssetsGate.state.map((data) => data.assets);
const $assetType = createStore(InventoryType.undefined).on(
    changeType,
    (_, type) => type
);
const $activeInventoryAssetName = createStore<string | null>(null)
    .on(changeActiveInventoryAssetName, (_, name) => name)
    .reset(changeType);
const $storageAssetName = createStore<string | null>(null)
    .on(changeStorageAssetName, (_, name) => name)
    .reset(changeType);

const $allTypes = combine(
    $mergedInventoryWithAtomicAssets,
    $mergedStorageWithAtomicAssets,
    (activeInventoryAssets, storageAssets) => {
        const typesSet = new Set<InventoryType>([InventoryType.undefined]);

        activeInventoryAssets.forEach((asset) => {
            typesSet.add(asset.inv_type);
        });

        storageAssets.forEach((asset) => {
            typesSet.add(asset.inv_type);
        });

        return [...typesSet].sort((a, b) => a - b);
    }
);

const commonAssetFilter = (
    assets: (AssetDataType & UserInventoryType)[],
    draggableAssets: Set<AssetDataType & UserInventoryType>,
    typeFilter: InventoryType
) =>
    assets.filter((asset) => {
        if (draggableAssets.has(asset)) return false;
        if (typeFilter === InventoryType.undefined) return true;

        return asset.inv_type === typeFilter;
    });

const filterAssetByName = (
    assets: (AssetDataType & UserInventoryType)[],
    nameFilter: string | null
) =>
    assets.filter((asset) => {
        if (nameFilter === null) return true;

        return asset.name === nameFilter;
    });

const $filteredActiveInventoryAssetsByType = combine(
    $mergedInventoryWithAtomicAssets,
    $draggableAssets,
    $assetType,
    commonAssetFilter
);

const $filteredStorageAssetsByType = combine(
    $mergedStorageWithAtomicAssets,
    $draggableAssets,
    $assetType,
    commonAssetFilter
);

const $filteredActiveInventoryAssets = combine(
    $filteredActiveInventoryAssetsByType,
    $activeInventoryAssetName,
    filterAssetByName
);

const $filteredStorageAssets = combine(
    $filteredStorageAssetsByType,
    $storageAssetName,
    filterAssetByName
);

export {
    DraggableAssetsGate,
    changeType,
    changeActiveInventoryAssetName,
    changeStorageAssetName,
    $assetType,
    $activeInventoryAssetName,
    $storageAssetName,
    $allTypes,
    $filteredActiveInventoryAssetsByType,
    $filteredStorageAssetsByType,
    $filteredActiveInventoryAssets,
    $filteredStorageAssets,
};
