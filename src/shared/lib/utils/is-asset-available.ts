import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';

export const isAssetAvailable = (
    card: MergedInventoryWithAtomicAssets[number]
) =>
    card.available_from === undefined ||
    card.available_from * 1000 <= Date.now();
