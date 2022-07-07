export enum AreaRarity {
    rockFields,
    spaceDebris,
    glaciers,
    lava,
    dmeSprings,
}

export enum SlotStatus {
    unreserved,
    reserved,
}

export type AreasDto = {
    id: string;
    engaged: number;
    init_id: number;
    fee_to_claim: number;
    initialized: boolean;
    rarity: AreaRarity;
    owner: string;
    mine_slots: { reserved: SlotStatus; mine_id: number }[];
};
