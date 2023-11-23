import { AssetStruct } from 'entities/game-stat';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';

export const isAssetAvailable = (
    card: AssetStruct | MergedInventoryWithAtomicAssets[number]
) =>
    card.available_from === undefined ||
    card.available_from * 1000 <= Date.now();
