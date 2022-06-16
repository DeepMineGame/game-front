import { InventoryIdType } from '../../constants';

export enum InventoryType {
    /* [0] */ undefined,
    /* [1] */ areas,
    /* [2] */ equipment,
    /* [3] */ structures,
}

export enum RarityType {
    /* [0] */ undefined,
    /* [1] */ common,
    /* [2] */ uncommon,
    /* [3] */ rare,
    /* [4] */ epic,
    /* [5] */ legendary,
}

export const rarityMap = {
    [RarityType.undefined]: null,
    [RarityType.common]: 'Common',
    [RarityType.uncommon]: 'Uncommon',
    [RarityType.rare]: 'Rare',
    [RarityType.epic]: 'Epic',
    [RarityType.legendary]: 'Legendary',
};

export type UserInventoryType = {
    asset_id: string;
    template_id: InventoryIdType;
    owner: string;
    in_use: 0 | 1;
    rarity: RarityType;
    weight: number;
    inv_type: InventoryType;
};
