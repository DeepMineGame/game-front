import { AssetStruct } from 'entities/game-stat';

export const removeDraggedElementFromState =
    (draggedElement: AssetStruct) => (state: Set<AssetStruct>) =>
        new Set(
            [...state].filter(
                ({ asset_id }) => asset_id !== draggedElement?.asset_id
            )
        );
