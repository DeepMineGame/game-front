import {
    EngineerSchema,
    InventoryTab,
    InventoryType,
    RarityType,
} from 'entities/smartcontract';

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

export const inventoriesTabMap: Record<EngineerSchema, number> = {
    [EngineerSchema.undefined]: InventoryTab.equipment,
    [EngineerSchema.equipment]: InventoryTab.equipment,
    [EngineerSchema.factory]: InventoryTab.equipment,
    [EngineerSchema.mine]: InventoryTab.mines,
    [EngineerSchema.module]: InventoryTab.modules,
};

export const rarityList: RarityType[] = [
    RarityType.common,
    RarityType.uncommon,
    RarityType.rare,
    RarityType.epic,
    RarityType.legendary,
];
