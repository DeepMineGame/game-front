import { InventoryType, RarityType } from 'entities/smartcontract';

export const raritiesTranslationMap: Record<RarityType, string> = {
    [RarityType.undefined]: '',
    [RarityType.common]: 'common',
    [RarityType.uncommon]: 'uncommon',
    [RarityType.rare]: 'rare',
    [RarityType.epic]: 'epic',
    [RarityType.legendary]: 'legendary',
};

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

export const rarityList: RarityType[] = [
    RarityType.common,
    RarityType.uncommon,
    RarityType.rare,
    RarityType.epic,
    RarityType.legendary,
];
