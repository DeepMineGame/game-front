import { UserInventoryType } from 'entities/smartcontract';

export const removeDraggedElementFromState =
    (draggedElement: UserInventoryType) => (state: Set<UserInventoryType>) =>
        new Set(
            [...state].filter(
                ({ asset_id }) => asset_id !== draggedElement?.asset_id
            )
        );
