import { createEffect } from 'effector';
import { AssetDataType, getAssets } from 'entities/atomicassets';

export const getInventoryAtomicAssetsEffect = createEffect<
    string[],
    AssetDataType[]
>(getAssets);
