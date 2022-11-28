import { InventoryType } from 'entities/smartcontract';

export const inventoriesTypeMap: Record<InventoryType, string> = {
    [InventoryType.undefined]: 'undefined',
    [InventoryType.areas]: 'area',
    [InventoryType.equipment]: 'equipment',
    [InventoryType.structures]: 'structure',
};
