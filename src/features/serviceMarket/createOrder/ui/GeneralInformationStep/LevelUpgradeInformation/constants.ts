import { InventoryType } from 'entities/smartcontract';

export const inventoriesTypeMap: Record<InventoryType, string> = {
    [InventoryType.undefined]: 'undefined',
    [InventoryType.areas]: 'area',
    [InventoryType.equipment]: 'equipment',
    [InventoryType.structures]: 'structure',
    [InventoryType.badges]: 'badge',
    [InventoryType.schemas]: 'schema',
    [InventoryType.upgrade_kits]: 'upgradeKit',
    [InventoryType.cards]: 'card',
    [InventoryType.modules]: 'module',
    [InventoryType.stickers]: 'sticker',
    [InventoryType.packs]: 'pack',
};
