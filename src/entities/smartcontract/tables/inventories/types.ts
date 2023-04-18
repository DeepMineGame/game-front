export enum InventoryType {
    /* [0] */ undefined,
    /* [1] */ areas,
    /* [2] */ equipment,
    /* [3] */ structures,
    /* [4] */ badges,
    /* [5] */ schemas,
    /* [6] */ upgrade_kits,
    /* [7] */ modules,
    /* [8] */ cards,
    /* [9] */ packs,
    /* [10] */ stickers,
}

export enum RarityType {
    /* [0] */ undefined,
    /* [1] */ common,
    /* [2] */ uncommon,
    /* [3] */ rare,
    /* [4] */ epic,
    /* [5] */ legendary,
}

export enum InUseType {
    notInUse,
    inUse,
}

export enum StructType {
    notMine,
    mine,
}

export const rarityMap = {
    [-1]: '',
    [RarityType.undefined]: '',
    [RarityType.common]: 'Common',
    [RarityType.uncommon]: 'Uncommon',
    [RarityType.rare]: 'Rare',
    [RarityType.epic]: 'Epic',
    [RarityType.legendary]: 'Legendary',
} as const;

export const raritiesTranslationMap: Record<RarityType, string> = {
    [RarityType.undefined]: '',
    [RarityType.common]: 'components.common.rarities.common',
    [RarityType.uncommon]: 'components.common.rarities.uncommon',
    [RarityType.rare]: 'components.common.rarities.rare',
    [RarityType.epic]: 'components.common.rarities.epic',
    [RarityType.legendary]: 'components.common.rarities.legendary',
};

export enum EquipmentType {
    undefined,
    cutter,
    wandering_reactor,
    plunging_blocks,
    delaminator,
    dme_wire,
}

export type UserInventoryType = {
    asset_id: string;
    template_id: number;
    owner: string;
    in_use: InUseType;
    struct_type: StructType;
    rarity: RarityType;
    weight?: number;
    inv_type: InventoryType;
    level: number;
    equip_type: EquipmentType;
    available_from: number;
    schema_type: number;
};

export enum InventoryTab {
    areas,
    structures,
    equipment,
    petobots,
    consumables,
    modules,
    bages,
    mines,
}
