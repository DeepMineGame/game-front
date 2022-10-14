import { InventoriedAssets } from 'entities/atomicassets';

export const removeDraggedElementFromState =
    (draggedElement: InventoriedAssets[number]) =>
    (state: Set<InventoriedAssets[number]>) =>
        new Set(
            [...state].filter(
                ({ asset_id }) => asset_id !== draggedElement?.asset_id
            )
        );
