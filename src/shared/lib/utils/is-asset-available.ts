import { InventoriedAssets } from 'entities/atomicassets';

export const isAssetAvailable = (card: InventoriedAssets[number]) =>
    card.available_from === undefined ||
    (card.available_from !== undefined &&
        card.available_from * 1000 <= Date.now());
