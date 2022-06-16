export enum AreaRarity {
    rockFields,
    spaceDebris,
    glaciers,
    lava,
    dmeSprings,
}

export type AreasDto = {
    id: number;
    initialized: boolean;
    rarity: AreaRarity;
    mine_slots: string[];
};
