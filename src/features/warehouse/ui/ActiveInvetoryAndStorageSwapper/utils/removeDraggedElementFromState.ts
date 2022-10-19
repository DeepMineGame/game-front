import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';

export const removeDraggedElementFromState =
    (draggedElement: MergedInventoryWithAtomicAssets[number]) =>
    (state: Set<MergedInventoryWithAtomicAssets[number]>) =>
        new Set(
            [...state].filter(
                ({ asset_id }) => asset_id !== draggedElement?.asset_id
            )
        );
