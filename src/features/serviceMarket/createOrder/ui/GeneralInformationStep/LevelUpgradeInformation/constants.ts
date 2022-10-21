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
};

export const rarityList: RarityType[] = [
    RarityType.common,
    RarityType.uncommon,
    RarityType.rare,
    RarityType.epic,
    RarityType.legendary,
];
